// export interface AddressDetailsType {
//   // define structure based on API response
//   data: any[]; // or use exact typing if you know structure
//   totalCount: number;
//   // etc...
// }

// Keep this file only for input params
// export interface GetAddressParams {
//   companyId: string;
//   tenantId: string;
//   token: string;
//   page: number;
//   rowPerPage: number;
//   searchString: string;
// }

export type AddressDetailsType = {
  data: {
    id: number | null;
    tagCode: string | null;
    tagName: string[];
    tagTypeId: string | null;
    tagValue: string | null;
    tenantId: string | null;
    branch: { active: boolean };
    zoneId: {
      id: number;
      tenantId: number;
      zoneName: string;
    };
    addressLine?: string;
    state?: string;
    pinCodeId?: string;
    country?: string;
    gst?: string;
    contact?: string;
    phone?: string;
  }[];
  message: string;
  statusts: string;
};
