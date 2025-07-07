import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserPreferences } from '../types/preferences.types';

interface PreferencesStore {
  preferences: UserPreferences | null;
  setPreferences: (preferences: UserPreferences) => void;
  applyPreferences: (preferences: UserPreferences) => void;
  initializePreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  theme: { mode: 'light' },
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
  },
};

const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set, get) => ({
      preferences: null,
      
      setPreferences: (preferences) => {
        set({ preferences });
        get().applyPreferences(preferences);
      },
      
      applyPreferences: (preferences) => {
        // Apply theme
        if (preferences.theme.mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (preferences.theme.mode === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          // System preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }

        // Apply font size
        const fontSizeMap = {
          small: '14px',
          medium: '16px',
          large: '18px',
        };
        document.documentElement.style.setProperty(
          '--base-font-size',
          fontSizeMap[preferences.accessibility.fontSize]
        );

        // Apply high contrast
        if (preferences.accessibility.highContrast) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }

        // Apply reduced motion
        if (preferences.accessibility.reducedMotion) {
          document.documentElement.classList.add('reduce-motion');
        } else {
          document.documentElement.classList.remove('reduce-motion');
        }
      },
      
      initializePreferences: () => {
        const { preferences } = get();
        if (preferences) {
          get().applyPreferences(preferences);
        } else {
          // Apply default preferences
          get().setPreferences(defaultPreferences);
        }
        
        // Listen for system theme changes if preference is 'system'
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', () => {
          const currentPrefs = get().preferences;
          if (currentPrefs?.theme.mode === 'system') {
            get().applyPreferences(currentPrefs);
          }
        });
      },
    }),
    {
      name: 'user-preferences',
      partialize: (state) => ({ preferences: state.preferences }),
    }
  )
);

export default usePreferencesStore;