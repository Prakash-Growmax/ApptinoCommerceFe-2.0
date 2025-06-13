import { z } from "zod";

// Define the structure of _source
const CustomerSourceSchema = z.object({
  companyID: z.number(),
  companyName: z.string(),
  businessType: z.string(),
  accountType: z.string(),
  currencyCode: z.string(),
  currencyId: z.string(),
  currencySymbol: z.string(),
  subIndustry: z.string(),
  pan: z.string(),
  accountOwner: z.array(z.any()), // could be refined if you know the structure
  supportOwner: z.array(z.any()),
  branchName: z.string(),
  city: z.string(),
  district: z.string(),
  state: z.string(),
  country: z.string(),
  gst: z.string(),
  erp_Code: z.string(),
  inviteStatus: z.string(),
  tenantId: z.number(),
  id: z.string(),
  ownerId: z.number(),
  ownerName: z.string(),
  ownerEmail: z.string(),
  customerIndexName: z.string(),
  isActivated: z.number(),
  customField: z.string(),
  defaultEmail: z.string(),
  mobileNumber: z.string(),
  nationalMobileNo: z.string(),
  isProfileAccess: z.number(),
  catalogAssigned: z.array(z.any()),
  customerGrp: z.array(z.any()),
  isSuperSeller: z.number(),
});

// Define structure of each hit
const CustomerHitSchema = z.object({
  _index: z.string(),
  _type: z.string(),
  _id: z.string(),
  _score: z.null(),
  _source: CustomerSourceSchema,
  sort: z.array(z.number()),
});

// Define the full response schema
const CustomerSearchResponseSchema = z.object({
  took: z.number(),
  timed_out: z.boolean(),
  _shards: z.object({
    total: z.number(),
    successful: z.number(),
    skipped: z.number(),
    failed: z.number(),
  }),
  hits: z.object({
    total: z.number(),
    max_score: z.null(),
    hits: z.array(CustomerHitSchema),
  }),
});

export const CustomersArraySchema = z.array(CustomerSourceSchema);
export type  CustomerSourceSchemaType= z.infer<typeof  CustomerSourceSchema >;
export type  CustomerSearchResponseType= z.infer<typeof  CustomerSearchResponseSchema>;
export type  CustomerArraySchemaType= z.infer<typeof  CustomersArraySchema >;