export const SUBSCRIPTION_TIERS = {
  pro: {
    name: 'Pro Plan',
    price: 60,
    payment_link: 'https://buy.stripe.com/fZe00KbK3e7gfUQdQR',
    features: [
      '10,000 articles per month',
      'Unlimited variations',
      'Priority support',
      'API access',
      'Custom metadata',
      'Export functionality'
    ],
    limits: {
      monthlyArticles: 10000,
      baseArticles: 100
    }
  }
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export const API_COSTS = {
  perplexity: {
    costPer1kTokens: 0.01,
    tokensPerArticle: 1000
  },
  imageGeneration: {
    costPerImage: 0.02
  }
} as const;
