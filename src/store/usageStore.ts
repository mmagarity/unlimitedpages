import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface UsageState {
  usage: {
    articlesGenerated: number;
    variationsCreated: number;
    lastUpdated: string;
  };
  loading: boolean;
  error: string | null;
  trackUsage: (action: string, count: number) => Promise<void>;
  getUsageStats: () => Promise<void>;
}

export const useUsageStore = create<UsageState>((set, get) => ({
  usage: {
    articlesGenerated: 0,
    variationsCreated: 0,
    lastUpdated: new Date().toISOString()
  },
  loading: false,
  error: null,
  trackUsage: async (action: string, count: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      await supabase.from('usage_logs').insert({
        user_id: user.id,
        action_type: action,
        article_count: count,
        created_at: new Date().toISOString()
      });

      // Update Stripe usage record
      await fetch('/api/usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, count })
      });

    } catch (error) {
      set({ error: 'Failed to track usage' });
    }
  },
  getUsageStats: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: usageLogs } = await supabase
        .from('usage_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (usageLogs) {
        const stats = usageLogs.reduce((acc, log) => ({
          articlesGenerated: acc.articlesGenerated + (log.action_type === 'generate' ? log.article_count : 0),
          variationsCreated: acc.variationsCreated + (log.action_type === 'variation' ? log.article_count : 0),
        }), {
          articlesGenerated: 0,
          variationsCreated: 0
        });

        set({
          usage: {
            ...stats,
            lastUpdated: new Date().toISOString()
          },
          loading: false
        });
      }
    } catch (error) {
      set({ error: 'Failed to fetch usage stats', loading: false });
    }
  }
}));