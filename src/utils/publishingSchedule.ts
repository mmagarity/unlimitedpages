import type { GeneratedArticle } from '../types/content';

// Webflow's publishing limits
const DAILY_LIMIT = 500;
const OPTIMAL_BATCH_SIZE = 50;

// Publishing time windows (Eastern Time)
const PUBLISHING_WINDOWS = [
  { start: 7, end: 10 },  // Morning: 7 AM - 10 AM
  { start: 11, end: 14 }, // Midday: 11 AM - 2 PM
  { start: 15, end: 19 }  // Afternoon/Evening: 3 PM - 7 PM
];

export const PUBLISHING_RATES = [
  { 
    rate: 100,
    description: 'Conservative - Best for maintaining quality (100/day)'
  },
  { 
    rate: 250,
    description: 'Balanced - Good mix of speed and control (250/day)'
  },
  { 
    rate: 500,
    description: 'Aggressive - Maximum allowed by Webflow (500/day)'
  }
];

export function getRecommendedRate(articleCount: number) {
  if (articleCount <= 1000) {
    return PUBLISHING_RATES[0];
  } else if (articleCount <= 5000) {
    return PUBLISHING_RATES[1];
  }
  return PUBLISHING_RATES[2];
}

export function generatePublishingSchedule(articles: GeneratedArticle[]) {
  const schedule = [];
  const startDate = new Date();
  startDate.setHours(7, 0, 0, 0); // Start at 7 AM

  let currentDate = new Date(startDate);
  let remainingArticles = [...articles];

  while (remainingArticles.length > 0) {
    // Skip weekends
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(7, 0, 0, 0);
      continue;
    }

    // Get daily batch (respect Webflow limit)
    const dailyBatch = remainingArticles.slice(0, DAILY_LIMIT);
    remainingArticles = remainingArticles.slice(DAILY_LIMIT);

    // Distribute across publishing windows
    const batchesPerWindow = Math.ceil(dailyBatch.length / PUBLISHING_WINDOWS.length);

    PUBLISHING_WINDOWS.forEach((window, index) => {
      const windowStart = new Date(currentDate);
      windowStart.setHours(window.start, 0, 0, 0);

      const windowArticles = dailyBatch.slice(
        index * batchesPerWindow,
        (index + 1) * batchesPerWindow
      );

      if (windowArticles.length > 0) {
        // Split into optimal batch sizes
        for (let i = 0; i < windowArticles.length; i += OPTIMAL_BATCH_SIZE) {
          const batch = windowArticles.slice(i, i + OPTIMAL_BATCH_SIZE);
          schedule.push({
            date: new Date(windowStart),
            articles: batch
          });

          // Add 30 minutes between batches
          windowStart.setMinutes(windowStart.getMinutes() + 30);
        }
      }
    });

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(7, 0, 0, 0);
  }

  return schedule;
}

export function formatPublishingTime(date: Date) {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatPublishingDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}