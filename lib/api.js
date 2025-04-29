import client from './contentful';

export async function getBlogPost(skip = 0, limit = 6) {
    if (!client) {
      console.error("Contentful client is not initialized");
      return {
        items: [],
        total: 0,
        skip: 0,
        limit: limit
      };
    }
    
    try {
      const response = await client.getEntries({
        content_type: 'blogPost', 
        order: '-fields.publishDate', 
        skip: skip,
        limit: limit,
      });
      
      return {
        items: response.items,
        total: response.total,
        skip: response.skip,
        limit: response.limit
      };
    } catch (error) {
      console.error("Error fetching entries from Contentful:", error);
      return {
        items: [],
        total: 0,
        skip: skip,
        limit: limit
      };
    }
  }
  
  export async function getAboutMe(){
    if(!client){
        console.error("Contentful client is not initialized");
    }
    try{
        const response = await client.getEntries({
            content_type: 'aboutMe',
            limit : 1
        })
    console.log(response);
    return (response.items)
    }catch(error){
        console.error("Error fetching AboutMe entries from contentful: ", error)
    }

  }