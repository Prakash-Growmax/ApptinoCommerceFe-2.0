export interface CompanyDetailsType {
  companyName: string;
  website: string;
  taxId: string;
  currencyCode: string;
  businessType: string;
  accountType: string;
  subIndustry: string;
  industryDescription: string;
  accountOwnerName: string;
  supportOwnerName: string;
  tags: string[];
}


export type GetCustomerDetailsParams = {
  customerId: string;
  tenantId: string;
  token: string;
};

export type CustomerResponse = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};
