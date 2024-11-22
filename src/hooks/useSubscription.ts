import { useState, useEffect } from 'react';
import type { Usage, SubscriptionLimits } from '../types/subscription';
import { SUBSCRIPTION_TIERS } from '../config/subscription';

// Mock subscription data for development
const mockUsage: Usage = {
  baseArticlesUsed: 5,
  totalArticlesGenerated: 2500,
  imagesGenerated: 15,
  lastUpdated: new Date().toISOString(),
  stripeUsage: {
    current_usage: 2500,
    limit: 10000
  }
};

export function useSubscription(userId: string) {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [limits, setLimits] = useState<SubscriptionLimits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setUsage(mockUsage);
      setLimits(SUBSCRIPTION_TIERS.basic.limits);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userId]);

  return { usage, limits, isLoading, error };
}