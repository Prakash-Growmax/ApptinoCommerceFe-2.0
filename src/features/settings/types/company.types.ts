export type Pagination = {
  searchString?: string;
}

export type CommonParams = {
  tenantId: string
  token: string
}

export type GetBranchDetailsParams = CommonParams & {
  userId: number
  companyId: number
  page: number
  rowPerPage: number
  searchString: string
}

export type GetCompanyDetailsParams = CommonParams & {
  companyId: number
}

export interface AccountData {
  accountTypeId: {
    id: number;
    name: string;
  };
  activated: boolean;
  addressId: number | null;
  bnplCustomerId: number | null;
  bnplEnabled: boolean;
  bnplPhone: string | null;
  businessTypeId: {
    id: number;
    name: string;
    tenantId: number;
  };
  companyIdentifier: string;
  currencyId: {
    currencyCode: string;
    decimal: string;
    description: string;
    id: number;
    precision: number;
    symbol: string;
    tenantId: number;
    thousand: string;
  };
  defaultEmail: string;
  finEndDate: string | null;
  finStartDate: string | null;
  finStartMonth: number;
  financialYear: string | null;
  id: number;
  inviteAccess: number;
  logo: string;
  name: string;
  profileAccess: boolean;
  subIndustryId: {
    description: string;
    id: number;
    industryId: {
      id: number;
      name: string;
      tenantId: number;
    };
    name: string;
    tenantId: number;
  };
  superSeller: boolean;
    taxDetailsId: {
    id: number;
    pan: string;
    panImage: string | null;
    tenantId: number;
  };
  taxExempted: boolean;
  taxExemptionId: number | null;
  tenantId: number;
  verified: boolean;
  website: string;
}

export interface AccountResponse {
  data: AccountData;
  message: string | null;
  status: string;
}