import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';

const MONTHLY_LIMIT = 5000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Get current month's usage
      const { data: usage, error: usageError } = await supabase
        .from('article_generation')
        .select('count')
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString())
        .lte('created_at', endOfMonth.toISOString())
        .single();

      if (usageError && usageError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw usageError;
      }

      // Get subscription status
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status, current_period_end')
        .eq('user_id', user.id)
        .single();

      return res.json({
        monthlyLimit: MONTHLY_LIMIT,
        used: usage?.count || 0,
        remaining: MONTHLY_LIMIT - (usage?.count || 0),
        subscription: subscription || null,
        resetDate: endOfMonth.toISOString()
      });
    } catch (error) {
      console.error('Usage fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch usage data' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Get current usage
      const { data: currentUsage } = await supabase
        .from('article_generation')
        .select('count')
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString())
        .lte('created_at', endOfMonth.toISOString())
        .single();

      if ((currentUsage?.count || 0) >= MONTHLY_LIMIT) {
        return res.status(403).json({ 
          error: 'Monthly limit reached',
          limit: MONTHLY_LIMIT,
          used: currentUsage?.count || 0
        });
      }

      // Increment usage counter
      const { data, error } = await supabase.rpc('increment_article_count', {
        user_id: user.id
      });

      if (error) throw error;

      return res.json({
        success: true,
        currentCount: data.count,
        remaining: MONTHLY_LIMIT - data.count
      });
    } catch (error) {
      console.error('Usage update error:', error);
      return res.status(500).json({ error: 'Failed to update usage data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}