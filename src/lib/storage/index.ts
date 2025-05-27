import { STORAGE_KEYS } from '@lib/utils/constants';

export class Storage {
  static get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : (defaultValue ?? null);
    } catch (error) {
      console.warn(`Error reading from localStorage:`, error);
      return defaultValue ?? null;
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage:`, error);
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing from localStorage:`, error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn(`Error clearing localStorage:`, error);
    }
  }
}

// Auth-specific storage utilities
export const AuthStorage = {
  getToken: () => Storage.get<string>(STORAGE_KEYS.AUTH_TOKEN),
  setToken: (token: string) => Storage.set(STORAGE_KEYS.AUTH_TOKEN, token),
  getRefreshToken: () => Storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN),
  setRefreshToken: (token: string) =>
    Storage.set(STORAGE_KEYS.REFRESH_TOKEN, token),
  clearTokens: () => {
    Storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    Storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },
};
