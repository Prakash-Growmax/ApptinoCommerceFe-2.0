import { z } from 'zod';

// Company details form schema
export const companyDetailsFormSchema = z.object({
  name: z.string().min(1, 'Company name is required').max(100, 'Company name must be less than 100 characters'),
  website: z.string().url('Invalid website URL').or(z.string().length(0)),
  taxId: z.string().min(1, 'Tax ID is required'),
  // businessTypeId: z.number().positive('Business type is required'),
  // accountTypeId: z.number().positive('Account type is required'),
  // currencyId: z.number().positive('Currency is required'),
  // subIndustryId: z.number().positive('Sub-industry is required'),
   businessTypeId: z.string().min(1, 'Business type is required'),
  accountTypeId: z.string().min(1, 'Account type is required'),
  currencyId: z.string().min(1, 'Currency is required'),
   subIndustryId: z.string().min(1, 'Sub-industry is required'),
  defaultEmail: z.string().email('Invalid email address').optional(),
  logo: z.string().optional(),
});

export type CompanyDetailsFormData = z.infer<typeof companyDetailsFormSchema>;

// Update company request schema
export const updateCompanyRequestSchema = z.object({
  id: z.number(),
  name: z.string(),
  website: z.string(),
  taxDetailsId: z.object({
    id: z.number(),
    pan: z.string(),
  }),
  businessTypeId: z.object({
    id: z.number(),
  }),
  accountTypeId: z.object({
    id: z.number(),
  }),
  currencyId: z.object({
    id: z.number(),
  }),
  subIndustryId: z.object({
    id: z.number(),
  }),
  defaultEmail: z.string().optional(),
  logo: z.string().optional(),
});

export type UpdateCompanyRequest = z.infer<typeof updateCompanyRequestSchema>;

// Response schema for update
export const updateCompanyResponseSchema = z.object({
  data: z.any(),
  message: z.string().nullable(),
  status: z.string(),
});

export type UpdateCompanyResponse = z.infer<typeof updateCompanyResponseSchema>;