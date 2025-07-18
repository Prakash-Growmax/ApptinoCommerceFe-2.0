
import { apiGet, apiPost, apiPut } from "@/lib/api/client";
import { CompanyDetailsType } from "../types/company.type";

import { GetCustomerDetailsParams, CustomerResponse } from "../types/company.type";


type CompanyDetailsParams = {
  companyId: string;
  tenantId: string;
  token: string;
};

export const getCompanyDetails = async ({
  companyId,
  tenantId,
  token,
}: CompanyDetailsParams): Promise<CompanyDetailsType> => {
  const response = await apiGet<{ data: CompanyDetailsType }>({
    url: `/corecommerce/accountses/getAccountDetails?companyId=${companyId}`
  });

  return response.data; 
};
export const createCustomer=async(tenantId:string,token:string,payload: any)=>{
  const response = await apiPost({
    url:`/corecommerce/accountses/inviteAccountsWithCompany`,
    data:payload
  })
  return response;
}


export const GetCustomerDetails = async ({
  customerId,
  tenantId,
  token
}: GetCustomerDetailsParams): Promise<CustomerResponse> => {
  const response = await apiGet<CustomerResponse>({
    url: `/corecommerce/customers/${customerId}`,
    config: {
      headers: {
        tenantId,
        Authorization: `Bearer ${token}`
      }
    }
  });

  return response;
};

