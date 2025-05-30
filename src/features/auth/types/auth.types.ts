import { z } from 'zod';
import {
  CheckUserNameSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  checkUserNameResponseSchema,
} from '@/validation/zod/Schema/auth';

// Fixed: consistent PascalCase naming for all types
export type CheckUserNameRequestType = z.infer<typeof CheckUserNameSchema>;

// Fixed: PascalCase naming to match other types
export type CheckUserNameResponseType = z.infer<typeof checkUserNameResponseSchema>;

export type LoginRequestSchemaType = z.infer<typeof LoginRequestSchema>;

export type LoginResponseSchemaType = z.infer<typeof LoginResponseSchema>;

// Add missing types that are referenced in your hooks
export interface LoginCredentials {
  username: string;
  password: string;
  // Add other fields as needed
}

export interface User {
  id: string;
  username: string;
  email?: string;
  // Add other user fields as needed
}