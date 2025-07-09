import { apiGet } from "@/lib/api/client";
import { CustomerData } from "../types/customer.type";
import { AccountFilterType } from "../schema/customer.schema";

export const CustomerFilters = async ({
  userId,
  companyId,
  tenantId,
}:Omit<CustomerData, 'token'>):Promise<AccountFilterType> => {
  const response = await apiGet<AccountFilterType>({
    url: `/corecommerce/filters/fetchAllAccountsFilterByUser?userId=${userId}&companyId=${companyId}`,
    config: {
      headers: {
        "x-tenant": tenantId,
      }
    }
  });

  return response;
};
export const getState = async (tenantId: string) => {
  const response = await apiGet({
    url: `homepagepublic/getAllState`,
    config: {
      headers: {
        "x-tenant": tenantId,
      }
    }
  });
  return response;
}
export const getCountry = async (tenantId: string) => {
  const response = await apiGet({
    url: `homepagepublic/getCountry`,
    config: {
      headers: {
        "x-tenant": tenantId,
      }
    }
  });
  return response;
}
export const getDistrict = async (tenantId: string) => {
  const response = await apiGet({
    url: `/homepagepublic/getAllDistrict`,
    config: {
      headers: {
        "x-tenant": tenantId,
      }
    }
  });
  return response;
}

export const getRoles = async (tenantId: string) => {
  const response = await apiGet({
    url: `/corecommerce/accessgroups`,
    config: {
      headers: {
        "x-tenant": tenantId,
      }
    }
  });
  
  return response;
};



