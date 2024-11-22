import type { GeneratedArticle } from '../types';
import { useWebflowStore } from '../store/webflowStore';

export class WebflowService {
  private static async getConfig() {
    const store = useWebflowStore.getState();
    const config = store.config;
    
    if (!config) {
      throw new Error('Webflow not configured');
    }
    
    return config;
  }

  static async validateCredentials(config: {
    apiKey: string;
    siteId: string;
    collectionId: string;
  }) {
    try {
      // First validate the API key and site ID
      const siteResponse = await fetch('https://api.webflow.com/sites', {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'accept-version': '1.0.0'
        }
      });

      if (!siteResponse.ok) {
        throw new Error(`Invalid API key or permissions: ${siteResponse.statusText}`);
      }

      const sites = await siteResponse.json();
      const siteExists = sites.some((site: any) => site.id === config.siteId);
      
      if (!siteExists) {
        throw new Error('Site ID not found in your Webflow account');
      }

      // Then validate the collection ID
      const collectionResponse = await fetch(`https://api.webflow.com/sites/${config.siteId}/collections`, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'accept-version': '1.0.0'
        }
      });

      if (!collectionResponse.ok) {
        throw new Error(`Failed to fetch collections: ${collectionResponse.statusText}`);
      }

      const collections = await collectionResponse.json();
      const collectionExists = collections.some((collection: any) => collection.id === config.collectionId);

      if (!collectionExists) {
        throw new Error('Collection ID not found in the specified site');
      }

      return true;
    } catch (error) {
      console.error('Webflow validation error:', error);
      throw error;
    }
  }

  static async publishContent(article: GeneratedArticle) {
    const config = await this.getConfig();
    
    try {
      // First create the item
      const createResponse = await fetch(`https://api.webflow.com/collections/${config.collectionId}/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'accept-version': '1.0.0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            name: article.content.title,
            slug: this.generateSlug(article.content.title),
            'post-body': article.content.mainContent,
            'post-summary': article.content.introduction,
            'meta-title': article.seo.metaTitle,
            'meta-description': article.seo.metaDescription,
            'publish-date': new Date().toISOString(),
            'author': 'AI Content Generator',
            '_archived': false,
            '_draft': false
          }
        })
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(`Failed to create item in Webflow: ${errorData.msg || createResponse.statusText}`);
      }

      const createdItem = await createResponse.json();

      // Then publish the item
      const publishResponse = await fetch(`https://api.webflow.com/collections/${config.collectionId}/items/${createdItem._id}/publish`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'accept-version': '1.0.0'
        }
      });

      if (!publishResponse.ok) {
        throw new Error('Failed to publish the created item');
      }

      return createdItem;
    } catch (error) {
      console.error('Webflow publish error:', error);
      throw error;
    }
  }

  static async getPublishedArticles() {
    const config = await this.getConfig();
    
    try {
      const response = await fetch(`https://api.webflow.com/collections/${config.collectionId}/items?limit=100`, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'accept-version': '1.0.0'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch published articles');
      }

      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Failed to fetch Webflow articles:', error);
      throw error;
    }
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}