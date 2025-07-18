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