import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  // UI state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Notification state
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      set => ({
        // Initial state
        sidebarCollapsed: false,
        notifications: [],

        // Actions
        setSidebarCollapsed: collapsed =>
          set({ sidebarCollapsed: collapsed }, false, 'setSidebarCollapsed'),

        addNotification: notification => {
          const id = crypto.randomUUID();
          set(
            state => ({
              notifications: [...state.notifications, { ...notification, id }],
            }),
            false,
            'addNotification'
          );
        },

        removeNotification: id =>
          set(
            state => ({
              notifications: state.notifications.filter(n => n.id !== id),
            }),
            false,
            'removeNotification'
          ),

        clearNotifications: () =>
          set({ notifications: [] }, false, 'clearNotifications'),
      }),
      {
        name: 'app-store',
        partialize: state => ({
          sidebarCollapsed: state.sidebarCollapsed,
        }),
      }
    ),
    { name: 'AppStore' }
  )
);
