import { generateArticleContent } from '../utils/perplexityApi';
import { generatePublishingSchedule } from '../utils/publishingSchedule';
import { generateInternalLinks } from '../utils/internalLinking';
import { publishToWebflow } from '../utils/webflowApi';
import type { GeneratedArticle, ContentRequest } from '../types/content';

export class ContentService {
  private articles: GeneratedArticle[] = [];
  private publishingQueue: Map<string, GeneratedArticle[]> = new Map();

  async generateContent(requests: ContentRequest[]): Promise<void> {
    const generatedArticles: GeneratedArticle[] = [];

    // Generate content for each request
    for (const request of requests) {
      try {
        const article = await generateArticleContent(request);
        generatedArticles.push(article);
      } catch (error) {
        console.error(`Failed to generate content for ${request.headline}:`, error);
      }
    }

    // Generate internal links after all articles are created
    this.articles = generatedArticles.map(article => ({
      ...article,
      internalLinks: generateInternalLinks(article, generatedArticles)
    }));

    // Create publishing schedule
    this.publishingQueue = generatePublishingSchedule(this.articles);
  }

  async startPublishing(collectionId: string): Promise<void> {
    // Sort queue entries by date
    const sortedQueue = new Map([...this.publishingQueue.entries()].sort());

    for (const [publishTime, articles] of sortedQueue) {
      const publishDate = new Date(publishTime);
      const now = new Date();

      if (publishDate > now) {
        // Schedule future publications
        const delay = publishDate.getTime() - now.getTime();
        setTimeout(() => {
          this.publishBatch(articles, collectionId);
        }, delay);
      } else {
        // Publish immediately if the time has passed
        await this.publishBatch(articles, collectionId);
      }
    }
  }

  private async publishBatch(articles: GeneratedArticle[], collectionId: string): Promise<void> {
    try {
      await publishToWebflow(articles, { id: collectionId, name: 'Articles', fields: [] });
      console.log(`Published batch of ${articles.length} articles`);
    } catch (error) {
      console.error('Failed to publish batch:', error);
    }
  }

  getPublishingSchedule(): Map<string, GeneratedArticle[]> {
    return this.publishingQueue;
  }

  getGeneratedArticles(): GeneratedArticle[] {
    return this.articles;
  }
}