import { z } from 'zod';

// Define environment variable schema
const environmentSchema = z.object({
  MODE: z.enum(['development', 'production', 'test', 'staging']),
  API_URL: z.string().url(),
  APP_VERSION: z.string().optional(),
  ENABLE_MOCKS: z.boolean().optional().default(false),
});

type Environment = z.infer<typeof environmentSchema>;

/**
 * Get environment variables with type validation
 */
export const getEnvironmentVariables = (): Environment => {
  // Get all environment variables from Vite
  const env = {
    MODE: import.meta.env.MODE,
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    APP_VERSION: import.meta.env.VITE_APP_VERSION,
    ENABLE_MOCKS: import.meta.env.VITE_ENABLE_MOCKS === 'true',
  };

  try {
    // Validate environment variables
    return environmentSchema.parse(env);
  } catch (error) {
    // Log validation errors
    console.error('Invalid environment variables:', error);

    // Provide fallback values in development
    if (import.meta.env.DEV) {
      console.warn('Using fallback environment variables');
      return {
        MODE: 'development',
        API_URL: 'http://localhost:8000/api',
        ENABLE_MOCKS: true,
      };
    }

    throw new Error('Invalid environment configuration');
  }
};

/**
 * Check if the application is running in development mode
 */
export const isDevelopment = (): boolean => {
  return getEnvironmentVariables().MODE === 'development';
};

/**
 * Check if the application is running in production mode
 */
export const isProduction = (): boolean => {
  return getEnvironmentVariables().MODE === 'production';
};

/**
 * Check if the application is running in test mode
 */
export const isTest = (): boolean => {
  return getEnvironmentVariables().MODE === 'test';
};

/**
 * Check if the application is running in staging mode
 */
export const isStaging = (): boolean => {
  return getEnvironmentVariables().MODE === 'staging';
};
