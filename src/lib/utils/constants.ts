export const APP_NAME = 'Enterprise React App';
export const APP_DESCRIPTION =
  'A scalable and production ready React application';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
    ME: '/auth/me',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_LANGUAGE: 'userLanguage',
  THEME: 'theme',
} as const;

// Query keys
export const QUERY_KEYS = {
  AUTH: {
    USER: ['auth', 'user'],
  },
  USERS: {
    ALL: ['users'],
    DETAIL: (id: string) => ['users', id],
  },
} as const;
