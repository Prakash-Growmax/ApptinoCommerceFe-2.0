

import useAccountsStore from "@/stores/useAccountStore";
import useUserStore from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomersFilters=()=>{
       const {userId,companyId,tenantId}=useUserStore();
    const token = localStorage.getItem("accessToken");
    const {setFilters,setLoading}=useAccountsStore();
    const fetchFilters = async () => {
  try {
     setLoading(true);
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
          limit: 20,
          offset: 0,
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
  } catch (error) {
    console.error("Error fetching filters", error);
    return null;
  }
};
 const query = useQuery({
    queryKey: [userId,companyId],
    queryFn:fetchFilters,
  });
  return query;
}