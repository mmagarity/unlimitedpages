import React, { useState } from 'react';
import { BarChart, CreditCard, Clock, ArrowUpRight, XCircle } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { SUBSCRIPTION_TIERS } from '../config/subscription';
import { supabase } from '../lib/supabase';

export function UsageBilling() {
  const { usage, limits, subscription, isLoading } = useSubscription('current-user');
  const [error, setError] = useState<string | null>(null);

  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleManageSubscription = async () => {
    try {
      setError(null);
      
      // If user has a subscription, redirect to the customer portal
      if (subscription?.stripe_customer_id) {
        const { data, error: portalError } = await supabase.functions.invoke('create-portal-session', {
          body: { 
            customer_id: subscription.stripe_customer_id,
            return_url: window.location.href
          }
        });

        if (portalError) throw portalError;
        window.location.href = data.url;
      } else {
        // If no subscription, redirect to payment link
        window.location.href = SUBSCRIPTION_TIERS.basic.payment_link;
      }
    } catch (err) {
      console.error('Error accessing billing portal:', err);
      setError('Failed to access billing portal. Please try again or contact support.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const currentPlan = subscription
    ? Object.values(SUBSCRIPTION_TIERS).find(
        tier => tier.stripe_price_id === subscription.price_id
      ) || SUBSCRIPTION_TIERS.basic
    : { name: 'Free Plan', price: 0, features: ['Limited access'] };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h3>
                  {subscription && (
                    <p className="text-sm text-gray-500 mt-1">
                      {subscription.cancel_at_period_end 
                        ? `Plan will be cancelled on ${formatDate(subscription.current_period_end)}`
                        : `Next billing date: ${formatDate(subscription.current_period_end)}`
                      }
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    ${currentPlan.price}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">per month</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleManageSubscription}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {subscription ? 'Manage Subscription' : 'Upgrade Plan'}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-md">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Overview */}
        <div>
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Usage Overview</h2>
            </div>
            <div className="p-6">
              {!isLoading && usage && limits && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Total Articles
                    </h4>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNumber(usage.totalArticlesGenerated)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      of {formatNumber(limits.monthlyArticles)} available
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${(usage.totalArticlesGenerated / limits.monthlyArticles) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}