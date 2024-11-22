import { create } from 'zustand';
import type { SubscriptionStatus } from '../types/subscription';
import { SUBSCRIPTION_TIERS } from '../config/subscription';

interface SubscriptionState {
  status: SubscriptionStatus | null;
  loading: boolean;
  error: string | null;
  createSubscription: (priceId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  updatePaymentMethod: (paymentMethodId: string) => Promise<void>;
  fetchStatus: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  status: {
    isActive: true, // Mock active subscription for development
    currentPlan: SUBSCRIPTION_TIERS.basic,
    usage: {
      totalArticles: 0,
      generatedArticles: 0,
      remainingArticles: 10000
    },
    willRenew: true,
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  loading: false,
  error: null,

  createSubscription: async () => {
    set({ loading: true, error: null });
    try {
      // Mock subscription creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({
        status: {
          isActive: true,
          currentPlan: SUBSCRIPTION_TIERS.basic,
          usage: {
            totalArticles: 0,
            generatedArticles: 0,
            remainingArticles: 10000
          },
          willRenew: true,
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        loading: false
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  cancelSubscription: async () => {
    set({ loading: true, error: null });
    try {
      // Mock cancellation
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        status: state.status ? {
          ...state.status,
          willRenew: false
        } : null,
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updatePaymentMethod: async () => {
    set({ loading: true, error: null });
    try {
      // Mock payment method update
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchStatus: async () => {
    set({ loading: true, error: null });
    try {
      // Mock status fetch
      await new Promise(resolve => setTimeout(resolve, 500));
      set({
        status: {
          isActive: true,
          currentPlan: SUBSCRIPTION_TIERS.basic,
          usage: {
            totalArticles: 0,
            generatedArticles: 0,
            remainingArticles: 10000
          },
          willRenew: true,
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        loading: false
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));