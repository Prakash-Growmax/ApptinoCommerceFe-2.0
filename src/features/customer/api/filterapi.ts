import { apiGet } from "@/lib/api/client";

type filter={
    userId:string,
    companyId:string,
}
export const getFilter = async ({userId,companyId}:filter) => {
  const response = await apiGet({
    url: `corecommerce/filters/fetchAllAccountsFilterByUser?userId=${userId}&companyId=${companyId}`,
  
  });

  return response;
};