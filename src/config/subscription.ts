export const SUBSCRIPTION_TIERS = {
  basic: {
    id: 'basic',
    name: 'Basic Plan',
    price: 60,
    interval: 'month',
    stripePriceId: 'price_XXXXX', // Replace with actual Stripe price ID
    limits: {
      monthlyArticles: 10000,
      baseArticles: 30,
      cityVariations: 1000,
      imagesPerArticle: 3,
      totalImages: 90
    },
    features: [
      'Generate up to 10,000 articles per month',
      'Scale Across 1,000 of the most populated US Cities',
      'Add Relevant Images for Every Article',
      'Unlimited Demographic Variations',
      'Webflow CMS Integration',
      'Schedule Automated Publishing'
    ]
  }
} as const;

export const API_COSTS = {
  perplexity: {
    costPer1kTokens: 0.01,
    tokensPerArticle: 1000
  },
  imageGeneration: {
    costPerImage: 0.02
  }
} as const;
