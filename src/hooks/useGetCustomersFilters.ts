

import useAccountsStore from "@/stores/useAccountStore";
import useUserStore from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "@/utils/errorHandling";

export const useGetCustomersFilters = () => {
       const {userId,tenantId,companyId}=useUserStore();
    const token = localStorage.getItem("accessToken");
    const {setFilters,setLoading,page,rowPerPage}=useAccountsStore();
    const fetchFilters = async (): Promise<any> => {
  try {
    const response = await fetch(`https://api.myapptino.com/corecommerce/filters/fetchAllAccountsFilterByUser?userId=${userId}&companyId=${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant': tenantId,
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();
    if(!data?.data?.limit){
        data = {
          accountName: "",
          branches: false,
          limit: rowPerPage,
          offset:page,
          pageNumber: 0,
          state: "",
          city: "",
          country: "",
          erp_Code: "",
          status: [],
          accountNameLs: [],
        };
    }
      let resFilters = data?.data?.limit ? data.data : data;
      setFilters(resFilters)
    return resFilters;
  } catch (error: unknown) {
    handleError(error, 'fetchFilters', 'Error fetching filters');
    return null;
  }
};
 const query = useQuery({
    queryKey: [userId,tenantId,page,rowPerPage],
    queryFn:fetchFilters,
    enabled: !!companyId && !!userId, // prevents running query without valid IDs
    refetchOnWindowFocus: false,
  });
  return query;
}