import { generateWithPerplexity } from '../lib/perplexity';
import type { LocationData } from '../lib/perplexity';

interface BatchGenerationOptions {
  batchSize?: number;
  progressCallback?: (progress: BatchGenerationProgress) => void;
}

interface BatchGenerationProgress {
  total: number;
  completed: number;
  currentBatch: number;
  totalBatches: number;
  currentLocation: string;
  estimatedTimeRemaining: number;
  attemptCount: number;
  remainingAttempts: number;
}

const DEFAULT_OPTIONS: Required<BatchGenerationOptions> = {
  batchSize: 5, // Process 5 locations per batch
  progressCallback: () => {},
};

const RATE_LIMIT_DELAY = 1000; // 1 second between batches
const MAX_MONTHLY_ARTICLES = 5000;

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateLocationBatch(
  headline: string,
  articleType: string,
  locations: LocationData[],
  options: BatchGenerationOptions = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const results: Record<string, any> = {
    successful: [],
    failed: [],
    attempts: 0
  };

  // Validate total locations doesn't exceed limit
  if (locations.length > MAX_MONTHLY_ARTICLES) {
    throw new Error(`Cannot generate more than ${MAX_MONTHLY_ARTICLES} articles per month. Requested: ${locations.length}`);
  }

  // Create batches of locations
  const batches = [];
  for (let i = 0; i < locations.length; i += opts.batchSize) {
    batches.push(locations.slice(i, i + opts.batchSize));
  }

  const startTime = Date.now();
  let completedCount = 0;
  let attemptCount = 0;

  // Keep track of failed locations to retry
  let remainingLocations = [...locations];
  
  // Continue until all articles are generated successfully or we hit the attempt limit
  while (remainingLocations.length > 0 && attemptCount + results.successful.length < MAX_MONTHLY_ARTICLES) {
    // Create current batch
    const currentBatch = remainingLocations.slice(0, opts.batchSize);
    const batchPromises = currentBatch.map(async (location) => {
      try {
        attemptCount++;
        const result = await generateWithPerplexity(headline, articleType, location);
        results.successful.push({
          location,
          content: result,
        });
        // Remove successful location from remaining
        remainingLocations = remainingLocations.filter(
          loc => loc.city !== location.city || loc.state !== location.state
        );
        completedCount++;
      } catch (error) {
        results.failed.push({
          location,
          error: error instanceof Error ? error.message : 'Unknown error',
          attemptNumber: attemptCount
        });
      }
    });

    // Wait for current batch to complete
    await Promise.all(batchPromises);

    // Update progress
    const progress: BatchGenerationProgress = {
      total: locations.length,
      completed: completedCount,
      currentBatch: Math.floor(completedCount / opts.batchSize) + 1,
      totalBatches: Math.ceil(locations.length / opts.batchSize),
      currentLocation: `Batch ${Math.floor(completedCount / opts.batchSize) + 1}`,
      estimatedTimeRemaining: calculateEstimatedTime(startTime, completedCount, locations.length),
      attemptCount,
      remainingAttempts: MAX_MONTHLY_ARTICLES - (attemptCount + results.successful.length)
    };
    opts.progressCallback(progress);

    // Add delay between batches if more remain
    if (remainingLocations.length > 0) {
      await delay(RATE_LIMIT_DELAY);
    }
  }

  // Check if we hit the attempt limit
  const hitAttemptLimit = attemptCount + results.successful.length >= MAX_MONTHLY_ARTICLES;

  return {
    ...results,
    summary: {
      total: locations.length,
      successful: results.successful.length,
      failed: results.failed.length,
      remainingLocations: remainingLocations.length,
      totalAttempts: attemptCount,
      hitAttemptLimit,
      timeElapsed: Date.now() - startTime,
      estimatedCost: calculateCost(results.successful.length),
      remainingMonthlyArticles: MAX_MONTHLY_ARTICLES - (attemptCount + results.successful.length)
    },
  };
}

function calculateEstimatedTime(startTime: number, completed: number, total: number): number {
  if (completed === 0) return 0;
  
  const elapsed = Date.now() - startTime;
  const averageTimePerItem = elapsed / completed;
  const remaining = total - completed;
  
  return Math.round(averageTimePerItem * remaining);
}

function calculateCost(articleCount: number): number {
  const tokensPerArticle = 4096;
  const costPer1kTokens = 0.0004;
  const totalTokens = articleCount * tokensPerArticle;
  return (totalTokens * costPer1kTokens) / 1000;
}

// Example usage:
/*
const locations: LocationData[] = [
  { city: 'San Francisco', state: 'CA', population: 874961 },
  // ... more locations
];

const results = await generateLocationBatch(
  'Luxury Real Estate Guide: [City]',
  'real_estate',
  locations,
  {
    batchSize: 5,
    progressCallback: (progress) => {
      console.log(`Batch ${progress.currentBatch}/${progress.totalBatches}`);
      console.log(`Completed: ${progress.completed}/${progress.total}`);
      console.log(`Attempts: ${progress.attemptCount} (${progress.remainingAttempts} remaining)`);
      console.log(`Estimated time remaining: ${progress.estimatedTimeRemaining}ms`);
    }
  }
);

console.log(`Generation complete:
- Total requested: ${results.summary.total}
- Successfully generated: ${results.summary.successful}
- Failed: ${results.summary.failed}
- Remaining locations: ${results.summary.remainingLocations}
- Total attempts: ${results.summary.totalAttempts}
- Monthly limit reached: ${results.summary.hitAttemptLimit}
- Time elapsed: ${results.summary.timeElapsed}ms
- Estimated cost: $${results.summary.estimatedCost.toFixed(2)}
- Remaining monthly articles: ${results.summary.remainingMonthlyArticles}
`);
*/
