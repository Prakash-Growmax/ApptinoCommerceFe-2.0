import { apiGet } from "@/lib/api/client"
import { GetBranchDetailsParams, GetCompanyDetailsParams, AccountResponse, AccountData } from "../types/company.types";
import { SettingsBranchResponse } from "../schema/settingsBranch.schema";

export const GetBranchDetails = async ({
  userId,
  companyId,
  page,
  rowPerPage,
  searchString,
  tenantId,
  token
}: GetBranchDetailsParams): Promise<SettingsBranchResponse> => {
  const response = apiGet<SettingsBranchResponse>({
    url: `/corecommerce/branches/readBranchwithPagination/${userId}?companyId=${companyId}&offset=${page}&limit=${rowPerPage}&searchString=${searchString}`
  })
  return response;
}

export const GetCompanyDetails = async ({
  companyId,
  tenantId,
  token
}: GetCompanyDetailsParams): Promise<AccountResponse> => {
  const response = await apiGet<AccountResponse>({
    url: `/corecommerce/companys/${companyId}`
  })
  return response;
}



export interface SubIndustryOption {
  value: string;
  label: string;
  id: number;
  name: string;
}

export const getSubIndustries = async (): Promise<SubIndustryOption[]> => {
  const response = await apiGet<{ id: number; name: string }[]>({
    url: '/corecommerce/subindustrys',
  });


  return (
    response?.map((item) => ({
      id: item.id,
      name: item.name,
      value: item.id.toString(),
      label: item.name,
    })) || []
  );
};



