// components/BlogContent.jsx
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

function BlogContent({ content }) {
  if (!content) {
    return <div>No content available</div>;
  }

  // Custom rendering options with Tailwind classes
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-5">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal pl-6 mb-4 text-gray-700">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="mb-1">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-gray-300" />,
      [INLINES.HYPERLINK]: (node, children) => (
        <a 
          href={node.data.uri} 
          className="text-blue-600 hover:text-blue-800 underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
    renderMark: {
      [MARKS.BOLD]: (text) => <span className="font-bold">{text}</span>,
      [MARKS.ITALIC]: (text) => <span className="italic">{text}</span>,
      [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
      [MARKS.CODE]: (text) => (
        <code className="bg-gray-100 text-sm p-1 rounded font-mono">{text}</code>
      ),
    }
  };

  // Convert the rich text document to React components with our custom options
  const renderedContent = documentToReactComponents(content, options);

  return (
    <div className="prose max-w-none">
      {renderedContent}
    </div>
  );
}

export default BlogContent;