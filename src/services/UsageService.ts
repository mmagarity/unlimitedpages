import { supabase } from '../lib/supabase';
import type { Usage, UsageMetrics } from '../types';

export class UsageService {
  static async trackUsage(userId: string, action: string, count: number, metadata?: any) {
    try {
      const { data, error } = await supabase
        .from('usage_logs')
        .insert({
          user_id: userId,
          action_type: action,
          article_count: count,
          metadata
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error tracking usage:', error);
      throw error;
    }
  }

  static async getCurrentUsage(userId: string): Promise<UsageMetrics> {
    const { data, error } = await supabase
      .from('usage_logs')
      .select('action_type, article_count')
      .eq('user_id', userId)
      .gte('created_at', new Date(new Date().setDate(1)).toISOString());

    if (error) throw error;

    return data.reduce((metrics: UsageMetrics, log) => {
      metrics.totalArticles += log.article_count;
      if (log.action_type === 'generate') {
        metrics.generatedArticles += log.article_count;
      }
      return metrics;
    }, {
      totalArticles: 0,
      generatedArticles: 0,
      remainingArticles: 0
    });
  }

  static async checkUsageLimits(userId: string): Promise<boolean> {
    const { data: limits } = await supabase
      .from('usage_limits')
      .select('*')
      .eq('user_id', userId)
      .single();

    const usage = await this.getCurrentUsage(userId);
    
    return usage.totalArticles < (limits?.limit_value || 0);
  }
}