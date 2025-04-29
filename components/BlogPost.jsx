import React from 'react';
import RichContent from './RichContent';

function BlogPost({ post }) {
  if (!post) return null;

  return (
    <article className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {post.fields.title}
      </h1>
      
      {post.fields.publishDate && (
        <div className="text-gray-500 mb-6">
          Published: {new Date(post.fields.publishDate).toLocaleDateString()}
        </div>
      )}
      
      {post.fields.featuredImage && (
        <div className="mb-8">
          <img 
            src={`https:${post.fields.featuredImage.fields.file.url}`} 
            alt={post.fields.featuredImage.fields.title || 'Featured image'} 
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      )}
      
      <div className="mb-6">
        <RichContent content={post.fields.content} />
      </div>
      
      {post.fields.tags && post.fields.tags.length > 0 && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          {post.fields.tags.map(tag => (
            <span 
              key={tag} 
              className="inline-block bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-full mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default BlogPost;