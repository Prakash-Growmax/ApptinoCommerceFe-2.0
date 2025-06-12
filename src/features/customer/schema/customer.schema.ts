import { z } from "zod";

// Schema for account filter data
export const AccountFilterData = z.object({
  accountName: z.string(),
  accountNameLs: z.array(z.string()),         // Assuming it's an array of strings
  branches: z.boolean(),
  city: z.string(),
  country: z.string(),
  erp_Code: z.string(),
  filter_by: z.string().nullable(),           // Replace with actual type if known
  isProfileAccess: z.boolean().nullable(),    // Assuming it’s a nullable boolean
  limit: z.number(),
  offset: z.number(),
  pageNumber: z.number(),
  q: z.string(),
  query_by: z.string().nullable(),            // Replace with actual type if known
  sort_by: z.string().nullable(),             // Replace with actual type if known
  state: z.string(),
  status: z.union([
    z.string(),                               // For values like "success"
    z.array(z.any())                          // Use a refined type if the structure is known
  ]),
});

// Schema for full API response
export const AccountFilterSchema = z.object({
  data: AccountFilterData,
  message: z.string().nullable(),             // Assuming message is a string
  status: z.string(),
});

// Type inference for use in TypeScript
export type AccountFilterType = z.infer<typeof AccountFilterSchema>;
