import useAccountsStore from "@/stores/useAccountStore";
import useUserStore from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "@/utils/errorHandling";
import { apiGet } from "@/lib/api/client";

export const useGetCustomersFilters = () => {
  const { userId, tenantId, companyId } = useUserStore();
  const { setFilters, setLoading, page, rowPerPage } = useAccountsStore();
  
  const fetchFilters = async (): Promise<any> => {
    try {
      const response = await apiGet<any>({
        url: `/corecommerce/filters/fetchAllAccountsFilterByUser?userId=${userId}&companyId=${companyId}`
      });

      let data = response;
      if (!data?.data?.limit) {
        data = {
          accountName: "",
          branches: false,
          limit: rowPerPage,
          offset: page,
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
      setFilters(resFilters);
      return resFilters;
    } catch (error: unknown) {
      handleError(error, 'fetchFilters', 'Error fetching filters');
      return null;
    }
  };
  
  const query = useQuery({
    queryKey: [userId, tenantId, page, rowPerPage],
    queryFn: fetchFilters,
    enabled: !!companyId && !!userId, // prevents running query without valid IDs
    refetchOnWindowFocus: false,
  });
  return query;
};