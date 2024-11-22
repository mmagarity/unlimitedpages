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
    (set) => ({
      // Initialize with mock credentials for development
      config: {
        apiKey: 'mock-api-key-xxxxx',
        siteId: 'mock-site-123',
        collectionId: 'mock-collection-456',
        isConnected: true // Auto-connected for development
      },
      loading: false,
      error: null,

      setConfig: async (config) => {
        set({ loading: true, error: null });
        try {
          // Mock API call for development
          await new Promise(resolve => setTimeout(resolve, 500));
          set({ config: { ...config, isConnected: true }, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      validateConnection: async () => {
        try {
          // Mock validation for development
          await new Promise(resolve => setTimeout(resolve, 500));
          return true;
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