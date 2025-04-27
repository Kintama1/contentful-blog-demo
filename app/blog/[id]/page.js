'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import client from '@/lib/contentful';
import BlogPost from '@/components/BlogPost';



export default function SingleBlogPost() {
  // Use useParams instead of router.query
  const params = useParams();
  const id = params?.id;
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    async function fetchBlogPost() {
      if (!client) {
        console.error("Contentful client is not initialized");
        setError("Failed to initialize content client. Check your environment variables.");
        setLoading(false);
        return;
      }
      
      try {
        const response = await client.getEntry(id);
        setPost(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError("Could not load the blog post. Please try again later.");
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [id]);

  if (!id || loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-16 px-4">
      <h1 className="text-2xl font-bold text-gray-800">Error</h1>
      <p className="mt-4 text-gray-600">{error}</p>
      <Link href="/blog" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Back to all posts
      </Link>
    </div>
  );
  
  if (!post) return (
    <div className="text-center py-16 px-4">
      <h1 className="text-2xl font-bold text-gray-800">Blog post not found</h1>
      <p className="mt-4 text-gray-600">The post you`&apos;`re looking for doesn`&apos;`t exist.</p>
      <Link href="/blog" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Back to all posts
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <BlogPost post={post} />
        
        <div className="max-w-3xl mx-auto mt-12">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
}