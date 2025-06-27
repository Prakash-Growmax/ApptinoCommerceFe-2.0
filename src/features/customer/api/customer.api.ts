import { apiGet } from "@/lib/api/client";
import { CustomerData } from "../types/customer.type";
import { AccountFilterType } from "../schema/customer.schema";
import { CurrencyType } from "../types/address.type";
import RawRoleResponse  from '../types/customer.type';

export const CustomerFilters = async ({
  userId,
  companyId,
  tenantId,
  token,
}:CustomerData):Promise<AccountFilterType> => {
  const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };

  const response = await apiGet<AccountFilterType>({
    url: `/corecommerce/filters/fetchAllAccountsFilterByUser?userId=${userId}&companyId=${companyId}`,
    config: {
      headers,
    },
  });

  return response; // 👈 You should return or process this
};
export const getState=async(tenantId:string,token:string)=>{
    const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };
  const response = await apiGet({
    url:`homepagepublic/getAllState`,
    config:{
      headers,
    }
  })
  return response
}
export const getCountry=async(tenantId:string,token:string)=>{
   const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };
    const response = await apiGet({
    url:`homepagepublic/getCountry`,
    config:{
      headers,
    }
  })
  return response
}
export const getDistrict=async(tenantId:string,token:string)=>{
    const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };
   const response = await apiGet({
    url:`/homepagepublic/getAllDistrict`,
    config:{
      headers,
    }
  })
  return response;
}

export const getRoles = async (tenantId: string, token: string) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-tenant': tenantId,
    Authorization: `Bearer ${token}`,
  };

  const response = await apiGet({
    url: `/corecommerce/accessgroups`,
    config: {
      headers,
    },
  });
  
  return response;
  // return response.data?? []
};



