import { apiGet } from "@/lib/api/client"
import { GetBranchDetailsParams } from "../types/company.types";
import { AccountResponse } from "../schema/settings.schema";
import { SettingsBranchResponse } from "../schema/settingsBranch.schema";

export const GetBranchDetails=async({userId,companyId,page,rowPerPage,searchString,tenantId,token}:GetBranchDetailsParams):Promise<SettingsBranchResponse>=>{
     const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };
  const response = apiGet<SettingsBranchResponse>({
    url:`/corecommerce/branches/readBranchwithPagination/${userId}?companyId=${companyId}&offset=${page}&limit=${rowPerPage}&searchString=${searchString}`,
    config:{
        headers,
    }
  })
  return response;
}
export const GetCompanyDetails=async({companyId,tenantId,token}:GetBranchDetailsParams):Promise<AccountResponse>=>{
       const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };
  const response = await apiGet<AccountResponse>({
   url:`/corecommerce/companys/${companyId}`,
   config:{
    headers
   }
  })
  return response;
}


