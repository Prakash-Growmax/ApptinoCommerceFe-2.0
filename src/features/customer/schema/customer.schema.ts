// import { z } from "zod";

// // Schema for account filter data
// export const AccountFilterData = z.object({
//   accountName: z.string(),
//   accountNameLs: z.array(z.string()),        
//   branches: z.boolean(),
//   city: z.string(),
//   country: z.string(),
//   erp_Code: z.string(),
//   filter_by: z.string().nullable(),           
//   isProfileAccess: z.boolean().nullable(),    
//   limit: z.number(),
//   offset: z.number(),
//   pageNumber: z.number(),
//   q: z.string(),
//   query_by: z.string().nullable(),            
//   sort_by: z.string().nullable(),             
//   state: z.string(),
//   status: z.union([
//     z.string(),                               
//     z.array(z.any())                          
//   ]),
// });

// // Schema for full API response
// export const AccountFilterSchema = z.object({
//   data: AccountFilterData,
//   message: z.string().nullable(),             
//   status: z.string(),
// });

// // Type inference for use in TypeScript
// export type AccountFilterType = z.infer<typeof AccountFilterSchema>;



import { z } from "zod";

export const AccountFilterData = z.object({
  accountName: z.string(),
  accountNameLs: z.array(z.string()),
  branches: z.boolean(),
  city: z.string(),
  country: z.string(),
  erp_Code: z.string(),
  filter_by: z.string().nullable(),
  isProfileAccess: z.boolean().nullable(),
  limit: z.number(),
  offset: z.number(),
  pageNumber: z.number(),
  q: z.string(),
  query_by: z.string().nullable(),
  sort_by: z.string().nullable(),
  state: z.string(),
  status: z.union([z.string(), z.array(z.any())]),
});

export const AccountFilterSchema = z.object({
  data: AccountFilterData,
  message: z.string().nullable(),
  status: z.string(),
});

export type AccountFilterData = z.infer<typeof AccountFilterData>;
export type AccountFilterSchema = z.infer<typeof AccountFilterSchema>;
