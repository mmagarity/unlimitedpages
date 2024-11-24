import type { GeneratedArticle } from '../types';
import { useWebflowStore } from '../store/webflowStore';
import { ContentValidator } from '../utils/contentValidation';

interface WebflowConfig {
  apiUrl: string;
  apiKey: string;
  siteId: string;
  collectionId: string;
}

interface ContentItem {
  id: string;
  fields: {
    name: string;
    slug: string;
    'post-body': string;
    'post-summary': string;
    'meta-title': string;
    'meta-description': string;
    'publish-date': string;
    'author': string;
    '_archived': boolean;
    '_draft': boolean;
  };
}

interface PublishResult {
  success: boolean;
  itemId: string;
  error?: string;
}

class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private maxTokens: number;
  private tokenRefillRate: number;

  constructor({ maxRequests, perMinute }: { maxRequests: number; perMinute: number }) {
    this.maxTokens = maxRequests;
    this.tokens = maxRequests;
    this.lastRefill = Date.now();
    this.tokenRefillRate = (perMinute * 60 * 1000) / maxRequests;
  }

  async waitForToken(): Promise<void> {
    this.refillTokens();
    
    if (this.tokens <= 0) {
      const waitTime = this.tokenRefillRate - (Date.now() - this.lastRefill);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.refillTokens();
    }
    
    this.tokens--;
  }

  private refillTokens(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const newTokens = Math.floor(timePassed / this.tokenRefillRate);
    
    if (newTokens > 0) {
      this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
      this.lastRefill = now;
    }
  }
}

export class WebflowService {
  private static instance: WebflowService;
  private config: WebflowConfig;
  private rateLimiter: RateLimiter;

  private constructor() {
    this.rateLimiter = new RateLimiter({
      maxRequests: 60,
      perMinute: 1
    });
  }

  public static getInstance(): WebflowService {
    if (!WebflowService.instance) {
      WebflowService.instance = new WebflowService();
    }
    return WebflowService.instance;
  }

  public async setConfig(config: WebflowConfig) {
    this.config = config;
    // Validate config
    await this.validateCredentials();
  }

  private async validateCredentials(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.apiUrl}/sites`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'accept-version': '2.0.0'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to validate Webflow credentials:', error);
      throw new Error('Invalid Webflow credentials');
    }
  }

  public async publishContent(article: GeneratedArticle): Promise<PublishResult> {
    // Validate content before publishing
    const validationResult = ContentValidator.validateArticle(article);
    if (!validationResult.isValid) {
      return {
        success: false,
        itemId: article.id,
        error: `Content validation failed: ${validationResult.errors.join(', ')}`
      };
    }

    const contentItem: ContentItem = {
      id: article.id,
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
    };

    await this.rateLimiter.waitForToken();
    
    try {
      const result = await this.publishSingleItem(contentItem);
      return result;
    } catch (error) {
      console.error(`Failed to publish item ${contentItem.id}:`, error);
      return {
        success: false,
        itemId: contentItem.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async publishSingleItem(item: ContentItem): Promise<PublishResult> {
    // Add retry logic
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${this.config.apiUrl}/collections/${this.config.collectionId}/items`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'accept-version': '2.0.0',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
          success: true,
          itemId: item.id
        };
      } catch (error) {
        attempts++;
        if (attempts === maxAttempts) {
          throw error;
        }
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
      }
    }

    throw new Error('Max retry attempts reached');
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}