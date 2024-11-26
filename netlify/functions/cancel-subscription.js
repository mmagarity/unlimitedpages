import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { userId } = JSON.parse(event.body);

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'User ID is required' })
      };
    }

    // Get current user profile to check subscription dates
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_start_date, subscription_end_date, articles_remaining')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch user profile' })
      };
    }

    // Calculate the end of the current billing period
    let currentPeriodEnd;
    if (profile.subscription_end_date) {
      currentPeriodEnd = new Date(profile.subscription_end_date);
    } else if (profile.subscription_start_date) {
      currentPeriodEnd = new Date(profile.subscription_start_date);
      // Add one month to the start date
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    } else {
      // If no dates are set, use end of current month
      currentPeriodEnd = new Date();
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
      currentPeriodEnd.setDate(0); // Last day of current month
    }

    // Update user's subscription status in Supabase
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'cancelled',
        // Keep the current period's end date
        subscription_end_date: currentPeriodEnd.toISOString(),
        // Keep their remaining articles for the current period
        monthly_article_limit: profile.articles_remaining,
        // Don't reset articles_remaining - let them use what they have left
        will_renew: false
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating subscription:', updateError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update subscription status' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Subscription cancelled successfully',
        currentPeriodEnd: currentPeriodEnd.toISOString(),
        remainingArticles: profile.articles_remaining
      })
    };
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
