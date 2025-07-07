import { useEffect } from 'react';
import usePreferencesStore from '../stores/usePreferencesStore';

/**
 * Hook to initialize user preferences on app load
 * This should be called once at the app root level
 */
export const useInitializePreferences = () => {
  const { initializePreferences } = usePreferencesStore();

  useEffect(() => {
    initializePreferences();
  }, [initializePreferences]);
};