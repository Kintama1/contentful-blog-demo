// app/blog/page.js
"use client";
import { useEffect, useState } from 'react';
import { getBlogPost } from '@/lib/api';
import BlogCard from '@/components/BlogCard';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const posts = await getBlogPost();
        setBlogPosts(posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  if (loading) return (
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
        {blogPosts.map(post => (
          <BlogCard key={post.sys.id} post={post} />
        ))}
      </div>
    </div>
  );
}