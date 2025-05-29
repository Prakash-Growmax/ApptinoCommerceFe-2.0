import { z } from 'zod';

import {
  CheckUserNameSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  checkUserNameResponseSchema,
} from '@/validation/zod/Schema/auth';

export type CheckUserNameRequestType = z.infer<typeof CheckUserNameSchema>;
export type checkUserNameResponseType = z.infer<
  typeof checkUserNameResponseSchema
>;
export type LoginRequestSchemaType = z.infer<typeof LoginRequestSchema>;
export type LoginResponseSchemaType = z.infer<typeof LoginResponseSchema>;
