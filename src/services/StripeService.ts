import { stripe } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import type { SubscriptionStatus, SubscriptionPlan } from '../types/subscription';

export class StripeService {
  static async createSubscription(priceId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: customer } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    const subscription = await stripe.subscriptions.create({
      customer: customer.stripe_customer_id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent']
    });

    return {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret
    };
  }

  static async cancelSubscription() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .single();

    await stripe.subscriptions.del(subscription.stripe_subscription_id);
  }

  static async updatePaymentMethod(paymentMethodId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: customer } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    await stripe.customers.update(customer.stripe_customer_id, {
      invoice_settings: {
        default_payment_method: paymentMethodId
      }
    });
  }

  static async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!subscription) {
      return {
        isActive: false,
        currentPlan: null,
        usage: {
          totalArticles: 0,
          generatedArticles: 0,
          remainingArticles: 0
        },
        willRenew: false
      };
    }

    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripe_subscription_id,
      {
        expand: ['items.data.price']
      }
    );

    return {
      isActive: stripeSubscription.status === 'active',
      currentPlan: STRIPE_CONFIG.plans[subscription.price_id as keyof typeof STRIPE_CONFIG.plans],
      usage: await this.getUsageMetrics(user.id),
      willRenew: !stripeSubscription.cancel_at_period_end,
      nextBillingDate: new Date(stripeSubscription.current_period_end * 1000)
    };
  }

  private static async getUsageMetrics(userId: string) {
    const { data: usage } = await supabase
      .from('usage_logs')
      .select('action_type, article_count')
      .eq('user_id', userId)
      .gte('created_at', new Date(new Date().setDate(1)).toISOString());

    return usage.reduce((metrics: any, log) => {
      metrics.totalArticles += log.article_count;
      if (log.action_type === 'generate') {
        metrics.generatedArticles += log.article_count;
      }
      return metrics;
    }, {
      totalArticles: 0,
      generatedArticles: 0,
      remainingArticles: 10000 // From plan limit
    });
  }
}