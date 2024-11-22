export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    monthlyArticles: number;
    baseArticles: number;
    cityVariations: number;
    imagesPerArticle: number;
  };
  stripePriceId: string;
}

export interface Usage {
  current_usage: number;
  limit: number;
}

export interface UsageMetrics {
  totalArticles: number;
  generatedArticles: number;
  remainingArticles: number;
}

export interface SubscriptionStatus {
  isActive: boolean;
  currentPlan: SubscriptionPlan | null;
  usage: UsageMetrics;
  willRenew: boolean;
  nextBillingDate?: Date;
}