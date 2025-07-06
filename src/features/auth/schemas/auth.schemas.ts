import { z } from 'zod';

const currencySchema = z.object({
  currencyCode: z.string(),
  decimal: z.string(),
  description: z.string(),
  id: z.number(),
  precision: z.number(),
  symbol: z.string(),
  tenantId: z.number(),
  thousand: z.string(),
});

const payloadSchema = z.object({
  companyId: z.number(),
  companyLogo: z.string().url(),
  companyName: z.string(),
  currency: currencySchema,
  dateFormat: z.string(),
  elasticCode: z.string(),
  roleId: z.number(),
  roleName: z.string(),
  roundOff: z.string(),
  taxExempted: z.boolean(),
  tenantId: z.string(),
  timeFormat: z.string(),
  timeZone: z.string(),
  userId: z.number(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  phoneNumber: z.string(),
  roleid: z.number(),
  status: z.enum(['CONFIRMED', 'PENDING', 'INACTIVE']), // Add other possible statuses if needed
  displayName: z.string(),
  notification_id: z.number(),
  isSeller: z.boolean(),
  secondaryEmail: z.string(),
  secondaryPhoneNumber: z.string(),
  picture: z.string().url(),
  phoneNumberVerified: z.boolean(),
  id: z.string(),
  sub: z.string(),
  iss: z.string(),
  aud: z.string(),
  allowAutoRegsiter: z.boolean(),
  isSmsConfigured: z.boolean(),
  type: z.string(),
  iat: z.number(), // issued at (Unix timestamp)
  exp: z.number(), // expiration (Unix timestamp)
});

// export.....
export const CheckUserNameSchema = z.object({
  UserName: z.string().email({
    message: 'Please enter a valid email address',
  }),
  reqOtp: z.string().optional(),
});
export const checkUserNameResponseSchema = z.object({
  data: z.object({
    hasPassword: z.boolean(),
    isNewUser: z.boolean(),
    reqOtp: z.boolean(),
  }),
});
export const LoginRequestSchema = z.object({
  UserName: z.string().email({
    message: 'Please enter a valid email address',
  }),
  Password: z
    .string({
      message: 'Please enter a valid password',
    })
    .min(1, 'Password is required'),
});
export const LoginResponseSchema = z.object({
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    payload: payloadSchema,
  }),
});

export const RefreshTokenRequestSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const RefreshTokenResponseSchema = z.object({
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export const LogoutRequestSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const LogoutResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  displayName: z.string(),
  picture: z.string().url().optional(),
  status: z.enum(['CONFIRMED', 'PENDING', 'INACTIVE']),
  companyId: z.number(),
  companyName: z.string(),
  roleId: z.number(),
  roleName: z.string(),
});

export const GetCurrentUserResponseSchema = z.object({
  user: UserSchema,
});

export const GetUsersResponseSchema = z.object({
  users: z.array(UserSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type CheckUserNameRequestType = z.infer<typeof CheckUserNameSchema>;

export type CheckUserNameResponseType = z.infer<
  typeof checkUserNameResponseSchema
>;

export type LoginRequestSchemaType = z.infer<typeof LoginRequestSchema>;
export type LoginSchemaType = z.infer<typeof LoginRequestSchema>;

export type LoginResponseSchemaType = z.infer<typeof LoginResponseSchema>;
export type RefreshTokenRequestSchemaType = z.infer<
  typeof RefreshTokenRequestSchema
>;
export type RefreshTokenResponseSchemaType = z.infer<
  typeof RefreshTokenResponseSchema
>;

export type LogoutRequestSchemaType = z.infer<typeof LogoutRequestSchema>;
export type LogoutResponseSchemaType = z.infer<typeof LogoutResponseSchema>;

export type UserSchemaType = z.infer<typeof UserSchema>;
export type GetCurrentUserResponseSchemaType = z.infer<typeof GetCurrentUserResponseSchema>;
export type GetUsersResponseSchemaType = z.infer<typeof GetUsersResponseSchema>;
