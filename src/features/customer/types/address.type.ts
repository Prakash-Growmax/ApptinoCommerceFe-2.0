

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


