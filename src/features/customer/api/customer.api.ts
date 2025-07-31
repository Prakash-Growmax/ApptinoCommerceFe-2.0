import { apiGet } from "@/lib/api/client";
import { CurrencyType, CustomerData } from "../types/customer.type";
import { AccountFilterData } from "../schema/customer.schema";

export const CustomerFilters = async ({
  userId,
  companyId,
  tenantId,
}:Omit<CustomerData, 'token'>):Promise<AccountFilterData> => {
  const response = await apiGet<AccountFilterData>({
    url: `/corecommerce/filters/fetchAllAccountsFilterByUser?userId=${userId}&companyId=${companyId}`
  });

  return response;
};
export const getState = async (tenantId: string) => {
  const response = await apiGet({
    url: `homepagepublic/getAllState`
  });
  return response;  
}
export const getCountry = async (tenantId: string) => {
  const response = await apiGet({
    url: `homepagepublic/getCountry`
  });
  return response;
}
export const getDistrict = async (tenantId: string) => {
  const response = await apiGet({
    url: `/homepagepublic/getAllDistrict`
  });
  return response ;
}

export const getRoles = async (tenantId: string) => {
  const response = await apiGet({
    url: `/corecommerce/accessgroups`
  });
  
  return response;
};


export const getBusinessTypes = async (tenantId: string) => {
  const response = await apiGet({
    url: `/corecommerce/businesstype?tenantId=${tenantId}`,
  });
  return response;
};



export const getCustomerTags = async () => {
  const response = await apiGet({
    url: `/corecommerce/tags/getAllTags`, 
  });
  return response;
};

