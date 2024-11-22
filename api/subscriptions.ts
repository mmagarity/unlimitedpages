import { stripe } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { priceId } = req.body;
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Create or get Stripe customer
      let { data: customer } = await supabase
        .from('customers')
        .select('stripe_customer_id')
        .eq('user_id', user.id)
        .single();

      if (!customer) {
        const stripeCustomer = await stripe.customers.create({
          email: user.email,
          metadata: {
            supabase_user_id: user.id
          }
        });

        await supabase.from('customers').insert({
          user_id: user.id,
          stripe_customer_id: stripeCustomer.id
        });

        customer = { stripe_customer_id: stripeCustomer.id };
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.stripe_customer_id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent']
      });

      return res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret
      });

    } catch (error) {
      console.error('Subscription creation failed:', error);
      return res.status(500).json({ error: 'Failed to create subscription' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('stripe_subscription_id')
        .eq('user_id', user.id)
        .single();

      if (subscription) {
        await stripe.subscriptions.del(subscription.stripe_subscription_id);
      }

      return res.json({ success: true });

    } catch (error) {
      console.error('Subscription cancellation failed:', error);
      return res.status(500).json({ error: 'Failed to cancel subscription' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}