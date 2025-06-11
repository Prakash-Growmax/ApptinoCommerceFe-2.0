import { apiGet } from "@/lib/api/client";
import { CustomerData } from "../types/customer.type";
import { AccountFilterType } from "../schema/customer.schema";

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
