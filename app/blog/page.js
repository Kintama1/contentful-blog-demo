// pages/blog/index.js
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogPost } from '@/lib/api';

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
          <div key={post.sys.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            {post.fields.featuredImage && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={`https:${post.fields.featuredImage.fields.file.url}?w=600`} 
                  alt={post.fields.featuredImage.fields.title || 'Featured image'} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {post.fields.title}
              </h2>
              
              {post.fields.content && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.fields.content.content[0]?.content[0]?.value?.substring(0, 100)}...
                </p>
              )}
              
              <div className="flex justify-between items-center">
              <Link href={`/blog/${post.sys.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  Read more
                </Link>
                
                {post.fields.publishDate && (
                  <span className="text-sm text-gray-500">
                    {new Date(post.fields.publishDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}