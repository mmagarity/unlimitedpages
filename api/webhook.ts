import { stripe } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const relevantEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_failed'
]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['stripe-signature'];
  if (!signature) {
    return res.status(400).json({ error: 'Missing signature' });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (relevantEvents.has(event.type)) {
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await handleSubscriptionChange(event.data.object);
          break;
        case 'customer.subscription.deleted':
          await handleSubscriptionDeletion(event.data.object);
          break;
        case 'invoice.paid':
          await handleSuccessfulPayment(event.data.object);
          break;
        case 'invoice.payment_failed':
          await handleFailedPayment(event.data.object);
          break;
      }
    }

    return res.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({ error: 'Webhook error' });
  }
}

async function handleSubscriptionChange(subscription: any) {
  const customerId = subscription.customer;
  const { data: customer } = await supabase
    .from('customers')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (!customer) return;

  await supabase.from('subscriptions').upsert({
    user_id: customer.user_id,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: customerId,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    quantity: subscription.items.data[0].quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_start: new Date(subscription.current_period_start * 1000),
    current_period_end: new Date(subscription.current_period_end * 1000)
  });

  // Set initial usage limits
  await supabase.from('usage_limits').upsert({
    user_id: customer.user_id,
    limit_type: 'monthly_articles',
    limit_value: 10000,
    reset_at: new Date(subscription.current_period_end * 1000)
  });
}

async function handleSubscriptionDeletion(subscription: any) {
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!sub) return;

  await supabase.from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id);

  // Clear usage limits
  await supabase.from('usage_limits')
    .delete()
    .eq('user_id', sub.user_id);
}

async function handleSuccessfulPayment(invoice: any) {
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
  await handleSubscriptionChange(subscription);
}

async function handleFailedPayment(invoice: any) {
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('stripe_subscription_id', invoice.subscription)
    .single();

  if (!sub) return;

  await supabase.from('subscriptions')
    .update({ status: 'past_due' })
    .eq('stripe_subscription_id', invoice.subscription);
}