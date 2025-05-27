import { z } from 'zod';

// User schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().optional(),
  role: z.enum(['user', 'admin']).default('user'),
});

export type User = z.infer<typeof userSchema>;

// Login credentials schema
export const loginCredentialsSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .max(100),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;

// Registration schema
export const registrationSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters',
      })
      .max(100),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({
        message: 'You must accept the terms and conditions',
      }),
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type Registration = z.infer<typeof registrationSchema>;

// Authentication response
export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
  refreshToken: z.string().optional(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
