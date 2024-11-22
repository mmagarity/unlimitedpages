export const STRIPE_CONFIG = {
  plans: {
    basic: {
      id: 'basic',
      name: 'Basic Plan',
      price: 60,
      interval: 'month',
      stripePriceId: process.env.VITE_STRIPE_BASIC_PRICE_ID,
      features: [
        'Generate up to 10,000 articles per month',
        'Scale Across 1,000 of the most populated US Cities',
        'Add Relevant Images for Every Article',
        'Unlimited Demographic Variations',
        'Webflow CMS Integration',
        'Schedule Automated Publishing'
      ],
      limits: {
        monthlyArticles: 10000,
        baseArticles: 30,
        cityVariations: 1000,
        imagesPerArticle: 3
      }
    }
  },
  usage: {
    metering: {
      articles: 'articles_generated',
      images: 'images_generated'
    },
    thresholds: {
      warning: 0.8, // 80% of limit
      critical: 0.95 // 95% of limit
    }
  }
} as const;