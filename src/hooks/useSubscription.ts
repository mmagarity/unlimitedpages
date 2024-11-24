import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Usage, SubscriptionLimits } from '../types/subscription';
import { SUBSCRIPTION_TIERS } from '../config/subscription';

export function useSubscription(userId: string) {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [limits, setLimits] = useState<SubscriptionLimits | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSubscriptionData() {
      try {
        // Fetch subscription data
        const { data: subData, error: subError } = await supabase
          .from('subscriptions')
          .select(`
            *,
            subscription_items (
              id,
              stripe_subscription_item_id,
              stripe_price_id,
              quantity
            )
          `)
          .eq('user_id', userId)
          .single();

        if (subError) throw subError;
        
        if (subData) {
          setSubscription(subData);
          
          // Set limits based on the subscription tier
          const tierKey = Object.keys(SUBSCRIPTION_TIERS).find(
            key => SUBSCRIPTION_TIERS[key].stripe_price_id === subData.price_id
          );
          
          if (tierKey) {
            setLimits(SUBSCRIPTION_TIERS[tierKey].limits);
          }

          // Fetch usage records for the current billing period
          const { data: usageData, error: usageError } = await supabase
            .from('usage_records')
            .select('quantity')
            .eq('subscription_item_id', subData.subscription_items[0].id)
            .gte('timestamp', subData.current_period_start)
            .lte('timestamp', subData.current_period_end);

          if (usageError) throw usageError;

          // Calculate total usage
          const totalUsage = usageData?.reduce((sum, record) => sum + record.quantity, 0) || 0;

          setUsage({
            baseArticlesUsed: totalUsage,
            totalArticlesGenerated: totalUsage,
            imagesGenerated: 0, // Add image tracking if needed
            lastUpdated: new Date().toISOString(),
            stripeUsage: {
              current_usage: totalUsage,
              limit: limits?.monthlyArticles || 0
            }
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching subscription data:', err);
        setError(err as Error);
        setIsLoading(false);
      }
    }

    fetchSubscriptionData();
  }, [userId]);

  return { usage, limits, subscription, isLoading, error };
}