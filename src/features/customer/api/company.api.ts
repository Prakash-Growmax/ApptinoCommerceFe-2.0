
import { apiGet } from "@/lib/api/client";
import { CompanyDetailsType } from "../types/company.type";

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
  const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };

  const response = await apiGet<{ data: CompanyDetailsType }>({
    url: `/corecommerce/accountses/getAccountDetails?companyId=${companyId}`,
    config: {
      headers,
    },
  });

  return response.data; // ✅ Only return inner `data`
};

