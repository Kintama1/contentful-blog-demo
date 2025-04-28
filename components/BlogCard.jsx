// components/BlogCard.jsx
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function BlogCard({ post }) {
  const router = useRouter();

  // Handle click to navigate to the blog post
  const handleClick = () => {
    router.push(`/blog/${post.sys.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-500 cursor-pointer hover:scale-[1.02] translate-y-0.5"
    >
      {post.fields.featuredImage && (
        <div className="h-48 overflow-hidden">
          <Image 
            src={`https:${post.fields.featuredImage.fields.file.url}?w=600`} 
            alt={post.fields.featuredImage.fields.title || 'Featured image'} 
            width={600}
            height={400}
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
          <span className="text-blue-600 hover:text-blue-800 font-medium">
            Read more
          </span>
          
          {post.fields.publishDate && (
            <span className="text-sm text-gray-500">
              {new Date(post.fields.publishDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;