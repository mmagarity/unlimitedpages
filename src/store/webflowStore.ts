import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WebflowConfig {
  apiKey: string;
  siteId: string;
  collectionId: string;
  isConnected: boolean;
}

interface WebflowState {
  config: WebflowConfig | null;
  loading: boolean;
  error: string | null;
  setConfig: (config: WebflowConfig) => Promise<void>;
  validateConnection: () => Promise<boolean>;
  disconnect: () => void;
  fetchConfig: () => Promise<void>;
}

export const useWebflowStore = create<WebflowState>()(
  persist(
    (set, get) => ({
      config: null,
      loading: false,
      error: null,

      setConfig: async (config) => {
        set({ loading: true, error: null });
        try {
          // Validate the config with Webflow API
          const response = await fetch('https://api.webflow.com/sites', {
            headers: {
              'Authorization': `Bearer ${config.apiKey}`,
              'accept-version': '2.0.0'
            }
          });
          
          if (!response.ok) {
            throw new Error('Invalid Webflow credentials');
          }
          
          set({ config: { ...config, isConnected: true }, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      validateConnection: async () => {
        const state = get();
        if (!state.config?.apiKey) return false;
        
        try {
          const response = await fetch('https://api.webflow.com/sites', {
            headers: {
              'Authorization': `Bearer ${state.config.apiKey}`,
              'accept-version': '2.0.0'
            }
          });
          return response.ok;
        } catch (error) {
          return false;
        }
      },

      disconnect: () => {
        set({ config: null });
      },

      fetchConfig: async () => {
        set({ loading: true, error: null });
        try {
          // Mock API call for development
          await new Promise(resolve => setTimeout(resolve, 500));
          set({
            config: {
              apiKey: 'mock-api-key-xxxxx',
              siteId: 'mock-site-123',
              collectionId: 'mock-collection-456',
              isConnected: true
            }
          });
        } catch (error: any) {
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      }
    }),
    {
      name: 'webflow-storage',
      partialize: (state) => ({
        config: state.config ? {
          ...state.config,
          apiKey: '***' // Don't persist API key in local storage
        } : null
      })
    }
  )
);