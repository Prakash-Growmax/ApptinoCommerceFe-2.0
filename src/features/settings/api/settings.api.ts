import { apiGet } from "@/lib/api/client"
import { GetBranchDetailsParams, GetCompanyDetailsParams, AccountResponse } from "../types/company.types";
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