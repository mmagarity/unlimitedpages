import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationSettings {
  publishComplete: boolean;
  usageAlerts: boolean;
  billingUpdates: boolean;
}

interface UserSettings {
  name: string;
  email: string;
  notifications: NotificationSettings;
}

interface SettingsState {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
  saveSettings: (settings: UserSettings) => Promise<void>;
  loadSettings: () => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: null,
      loading: false,
      error: null,

      saveSettings: async (settings) => {
        set({ loading: true, error: null });
        try {
          // Mock API call for development
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ settings, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      loadSettings: async () => {
        set({ loading: true, error: null });
        try {
          // Mock API call for development
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Initialize with default settings if none exist
          if (!get().settings) {
            set({
              settings: {
                name: 'Demo User',
                email: 'demo@example.com',
                notifications: {
                  publishComplete: true,
                  usageAlerts: true,
                  billingUpdates: true
                }
              }
            });
          }
          
          set({ loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      updateSettings: (newSettings) => {
        const currentSettings = get().settings;
        if (currentSettings) {
          set({
            settings: {
              ...currentSettings,
              ...newSettings,
              notifications: {
                ...currentSettings.notifications,
                ...(newSettings.notifications || {})
              }
            }
          });
        }
      }
    }),
    {
      name: 'user-settings'
    }
  )
);