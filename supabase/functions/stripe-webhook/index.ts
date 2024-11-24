import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret!)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const priceId = subscription.items.data[0].price.id

        // Get or create user
        let { data: user, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!user) {
          const customerEmail = session.customer_details?.email
          if (!customerEmail) {
            throw new Error('No customer email found')
          }

          // Create auth user
          const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email: customerEmail,
            email_confirm: true,
            password: crypto.randomUUID(), // They'll need to use password reset to set their password
          })

          if (authError) throw authError

          // Create user record
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert({
              id: authUser.user.id,
              email: customerEmail,
              stripe_customer_id: customerId,
            })
            .select()
            .single()

          if (createError) throw createError
          user = newUser
        }

        // Create subscription record
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: user.id,
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: customerId,
            price_id: priceId,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })

        if (subscriptionError) throw subscriptionError
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Get user
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('stripe_customer_id', customerId)
          .single()

        if (userError) throw userError

        // Update subscription
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: user.id,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: customerId,
            price_id: subscription.items.data[0].price.id,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })

        if (subscriptionError) throw subscriptionError
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Delete subscription record
        const { error: deleteError } = await supabase
          .from('subscriptions')
          .delete()
          .eq('stripe_subscription_id', subscription.id)

        if (deleteError) throw deleteError
        break
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    console.error('Webhook error:', err)
    return new Response(
      JSON.stringify({
        error: {
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : undefined,
        },
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
