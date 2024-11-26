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
      if (!userId) {
        console.log(' No userId provided to useSubscription');
        setIsLoading(false);
        return;
      }

      console.log(' Checking subscription for userId:', userId);

      try {
        // First, check user's email
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error(' Error fetching user data:', userError);
          throw userError;
        }

        console.log(' User data:', userData);

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
          .eq('status', 'active')
          .single();

        console.log(' Subscription query result:', { subData, subError });

        if (subError && subError.code !== 'PGRST116') { // Ignore "no rows returned" error
          console.error(' Subscription fetch error:', subError);
          throw subError;
        }
        
        if (subData && subData.status === 'active') {
          // Check if subscription is expired
          const now = new Date();
          const periodEnd = new Date(subData.current_period_end);
          
          console.log(' Subscription dates:', {
            now: now.toISOString(),
            periodEnd: periodEnd.toISOString(),
            isExpired: now > periodEnd
          });

          if (now > periodEnd) {
            console.log(' Subscription expired');
            setSubscription(null);
            setIsLoading(false);
            return;
          }

          console.log(' Active subscription found:', subData);
          setSubscription(subData);
          
          // Set limits based on the subscription tier
          const tierKey = Object.keys(SUBSCRIPTION_TIERS).find(
            key => SUBSCRIPTION_TIERS[key].stripe_price_id === subData.price_id
          );
          
          console.log(' Subscription tier:', { tierKey, priceId: subData.price_id });

          if (tierKey) {
            setLimits(SUBSCRIPTION_TIERS[tierKey].limits);
          }

          // Fetch usage records for the current billing period
          if (subData.subscription_items?.[0]?.id) {
            const { data: usageData, error: usageError } = await supabase
              .from('usage_records')
              .select('quantity')
              .eq('subscription_item_id', subData.subscription_items[0].id)
              .gte('timestamp', subData.current_period_start)
              .lte('timestamp', subData.current_period_end);

            console.log(' Usage data:', { usageData, usageError });

            if (usageError) {
              console.error(' Usage fetch error:', usageError);
              throw usageError;
            }

            // Calculate total usage
            const totalUsage = usageData?.reduce((sum, record) => sum + record.quantity, 0) || 0;

            console.log(' Total usage:', totalUsage);

            setUsage({
              baseArticlesUsed: totalUsage,
              totalArticlesGenerated: totalUsage,
              imagesGenerated: 0,
              lastUpdated: new Date().toISOString(),
              stripeUsage: {
                current_usage: totalUsage,
                limit: limits?.monthlyArticles || 0
              }
            });
          }
        } else {
          console.log(' No active subscription found');
          setSubscription(null);
        }

        setIsLoading(false);
      } catch (err) {
        console.error(' Error in useSubscription:', err);
        setError(err as Error);
        setIsLoading(false);
      }
    }

    fetchSubscriptionData();
  }, [userId]);

  return { usage, limits, subscription, isLoading, error };
}