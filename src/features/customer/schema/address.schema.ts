export interface AddressDetailsType {
  data: {
    addressTags: {
      id: number | null;
      tagCode: string | null;
      tagName: string[];
      tagTypeId: string | null;
      tagValue: string | null;
      tenantId: string | null;
      branch: {
        active: boolean;
        // Add other fields if needed
      };
      zoneId: {
        id: number;
        tenantId: number;
        zoneName: string;
      };
    }[];
    totalCount: number;
  };
  message: string;
  status: string;
}