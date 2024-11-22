import type { GeneratedArticle, WebflowCollection } from '../types/content';

const WEBFLOW_API_ENDPOINT = 'https://api.webflow.com/v2';
const DAILY_LIMIT = 500;
const BATCH_SIZE = 50;
const RATE_LIMIT_DELAY = 2000; // 2 seconds between batches

export async function publishToWebflow(
  articles: GeneratedArticle[],
  collection: WebflowCollection,
  onProgress?: (published: number, failed: number) => void
): Promise<void> {
  const apiKey = process.env.WEBFLOW_API_KEY;
  const siteId = process.env.WEBFLOW_SITE_ID;

  if (!apiKey || !siteId) {
    throw new Error('Missing Webflow API configuration');
  }

  const totalArticles = articles.length;
  const daysNeeded = Math.ceil(totalArticles / DAILY_LIMIT);
  let publishedCount = 0;
  let failedCount = 0;

  // Process articles in daily batches
  for (let day = 0; day < daysNeeded; day++) {
    const startIdx = day * DAILY_LIMIT;
    const endIdx = Math.min(startIdx + DAILY_LIMIT, totalArticles);
    const dailyArticles = articles.slice(startIdx, endIdx);

    // Process daily batch in smaller chunks
    for (let i = 0; i < dailyArticles.length; i += BATCH_SIZE) {
      const batch = dailyArticles.slice(i, i + BATCH_SIZE);
      
      try {
        await publishBatch(batch, collection, apiKey);
        publishedCount += batch.length;
        
        if (onProgress) {
          onProgress(publishedCount, failedCount);
        }

        // Respect rate limits
        await delay(RATE_LIMIT_DELAY);
      } catch (error) {
        console.error('Failed to publish batch:', error);
        failedCount += batch.length;
        
        if (onProgress) {
          onProgress(publishedCount, failedCount);
        }
      }
    }

    // If more articles remain, wait until next day
    if (endIdx < totalArticles) {
      await delay(86400000); // 24 hours
    }
  }
}

async function publishBatch(
  articles: GeneratedArticle[],
  collection: WebflowCollection,
  apiKey: string
): Promise<void> {
  const promises = articles.map(article => 
    publishArticle(article, collection.id, apiKey)
  );

  await Promise.all(promises);
}

async function publishArticle(
  article: GeneratedArticle,
  collectionId: string,
  apiKey: string
): Promise<void> {
  const response = await fetch(`${WEBFLOW_API_ENDPOINT}/collections/${collectionId}/items`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept-Version': '2.0.0'
    },
    body: JSON.stringify({
      fields: {
        name: article.content.title,
        slug: generateSlug(article),
        'post-body': article.content.mainContent,
        'post-summary': article.content.introduction,
        'meta-title': article.seo.metaTitle,
        'meta-description': article.seo.metaDescription,
        'publish-date': article.publishingSchedule?.publishAt || new Date().toISOString(),
        'author': 'AI Content Generator',
        '_archived': false,
        '_draft': false
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Webflow API error: ${response.statusText}`);
  }
}

function generateSlug(article: GeneratedArticle): string {
  const { location, topic, year } = article.metadata;
  return `${location.state.toLowerCase()}/${location.city.toLowerCase()}/${topic.toLowerCase()}-${year}`
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}