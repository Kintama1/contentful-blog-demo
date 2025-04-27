import client from './contentful';

export async function getBlogPost() {
    if (!client) {
      console.error("Contentful client is not initialized");
      return [];
    }
    
    try {
      const response = await client.getEntries({
          content_type: 'blogPost'
      });
      console.log("seeing how the blog response looks", response);
      return response.items;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }