import { z } from "zod";

export const AddressSchema = z.object({
  addressLine: z.string(),
  billToCode: z.string().nullable(),
  branchName: z.string(),
  city: z.string(),
  country: z.string(),
  countryCode: z.string().nullable(),
  district: z.string(),
  gst: z.string().nullable(),
  id: z.number(),
  isBilling: z.boolean(),
  isCustAddress: z.boolean(),
  isShipping: z.boolean(),
  lattitude: z.string().nullable(),
  locality: z.string(),
  locationUrl: z.string().nullable(),
  longitude: z.string().nullable(),
  mobileNo: z.string().nullable(),
  nationalMobileNum: z.string().nullable(),
  phone: z.string(),
  pinCodeId: z.string(),
  primaryContact: z.string().nullable(),
  regAddress: z.boolean(),
  shipToCode: z.string().nullable(),
  soldToCode: z.string().nullable(),
  state: z.string(),
  tenantId: z.number(),
  vendorID: z.number().nullable(),
  wareHouse: z.boolean()
});

export const WareHouseSchema = z.object({
  addressId: AddressSchema,
  branchDefault: z.boolean(),
  brannchWareHouseId: z.number(),
  companyId: z.number(),
  contactNumber: z.string().nullable(),
  contactPerson: z.string().nullable(),
  id: z.number(),
  isDefault: z.boolean(),
  salesOrgCode: z.string().nullable(),
  wareHouseIdentifier: z.string(),
  wareHouseName: z.string(),
  wareHousecode: z.string()
});

export const BranchResponseSchema = z.object({
  addressId: AddressSchema,
  branchSequenceNumber: z.number().nullable(),
  businessUnits: z.array(z.any()), // You can refine this if you know the shape
  code: z.string().nullable(),
  id: z.number(),
  inSequenceNumber: z.number().nullable(),
  name: z.string(),
  poSequenceNumber: z.number().nullable(),
  removeBranchWareHouseId: z.number().nullable(),
  removeBusinessUnits: z.any().nullable(),
  salesBranchCode: z.string().nullable(),
  salesOrgId: z.number().nullable(),
  soSequenceNumber: z.number().nullable(),
  toSequenceNumber: z.number().nullable(),
  wareHouses: z.array(WareHouseSchema),
  zoneId: z.number().nullable()
});
export const FullApiResponseSchema = z.object({
  data: z.object({
    branchResponse: z.array(BranchResponseSchema),
    totalCount: z.number()
  }),
  message: z.string(),
  status: z.string()
});
 
export type SettingsBranchResponse = z.infer<typeof FullApiResponseSchema>;
