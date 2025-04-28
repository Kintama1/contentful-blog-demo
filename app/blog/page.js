"use client";
import { useEffect, useState, useRef, useCallback } from 'react';
import { getBlogPost } from '@/lib/api';
import BlogCard from '@/components/BlogCard';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    skip: 0,
    limit: 6,
    total: 0
  });
  
  // Create a ref for our observer's target element
  const observerTarget = useRef(null);
  // Reference to store our observer instance
  const observer = useRef(null);

  // Function to fetch blog posts
  const fetchBlogPosts = useCallback(async (skipValue = 0) => {
    if (!hasMore && skipValue > 0) return;
    
    try {
      setLoading(true);
      const response = await getBlogPost(skipValue, pageInfo.limit);
      
      if (skipValue === 0) {
        // Initial load
        setBlogPosts(response.items);
      } else {
        // Load more - append new posts with unique key check
        setBlogPosts(prevPosts => {
          // Create a Set of existing IDs to prevent duplicates
          const existingIds = new Set(prevPosts.map(post => post.sys.id));
          // Filter out any duplicates from new items
          const newItems = response.items.filter(item => !existingIds.has(item.sys.id));
          return [...prevPosts, ...newItems];
        });
      }
      
      // Update pagination info
      setPageInfo({
        skip: response.skip + response.items.length,
        limit: response.limit,
        total: response.total
      });
      
      // Check if we have more posts to load
      setHasMore(response.skip + response.items.length < response.total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setLoading(false);
    }
  }, [hasMore, pageInfo.limit]);

  // Initial load
  useEffect(() => {
    fetchBlogPosts(0);
    
    // Cleanup function
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);  

  // Set up the intersection observer for infinite scrolling
  useEffect(() => {
    // Only create observer if we have more posts to load
    if (!observerTarget.current || loading || !hasMore) return;
  
    if (observer.current) {
      observer.current.disconnect();
    }
    
    // Debounce function to prevent multiple calls
    let timeout;
    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        // Clear any existing timeout
        if (timeout) clearTimeout(timeout);
        
        // Set a timeout to debounce multiple calls
        timeout = setTimeout(() => {
          fetchBlogPosts(pageInfo.skip);
        }, 300);
      }
    };
    
    // Create new observer
    observer.current = new IntersectionObserver(
      handleIntersection,
      { 
        threshold: 0.1,  
        rootMargin: '100px'  
      }
    );
    
    observer.current.observe(observerTarget.current);
    
    return () => {
      if (timeout) clearTimeout(timeout);
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, pageInfo.skip, fetchBlogPosts]);

  if (loading && blogPosts.length === 0) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (!blogPosts.length) return (
    <div className="text-center py-16 px-4">
      <h1 className="text-2xl font-bold text-gray-800">No blog posts found</h1>
      <p className="mt-4 text-gray-600">Check back later for new content.</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Blog Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogCard 
            key={`${post.sys.id}-${index}`} 
            post={post} 
          />
        ))}
      </div>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {hasMore && (
        <div ref={observerTarget} className="h-20 w-full mt-8"></div>
      )}
      
      {!hasMore && blogPosts.length > 0 && (
        <p className="text-center text-gray-600 mt-8">You`&apos;`ve reached the end!</p>
      )}
    </div>
  );
}