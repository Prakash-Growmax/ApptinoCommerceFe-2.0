import useAccountsStore from "@/stores/useAccountStore";
import useUserStore from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { AccountElastic } from "../api/AccountElastics";
import { ElasticSearchServices } from "../api/ElasticSearchServices";

export const useFetchCustomersWithFilters = () => {
  const { userId, tenantId, companyId } = useUserStore();
  const token = localStorage.getItem("accessToken");

  const { setFilters, setData, setLoading, page, rowPerPage,setTotalCount,filters } = useAccountsStore();

  // STEP 1: Fetch filters
  const filtersQuery = useQuery({
    queryKey: ["filters", userId, tenantId, page, rowPerPage],
    queryFn: async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.myapptino.com/corecommerce/filters/fetchAllAccountsFilterByUser?userId=${userId}&companyId=${companyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": tenantId,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
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
      
      setFilters({
        ...resFilters,
        limit:rowPerPage,
        offset:page
      });
      return resFilters;
    },
    enabled: !!companyId && !!userId,
    refetchOnWindowFocus: false,
  });

  // STEP 2: Fetch customers once filters are loaded
  const customersQuery = useQuery({
    queryKey: ["customers", filters],
    queryFn: async () => {
      const elasticData = AccountElastic.BuildCustomerquery(filters);
      const data = await ElasticSearchServices.CustomerGet(elasticData, tenantId);
      const customerResponse = ElasticSearchServices.FormatResults(data);
      
      setData(customerResponse);
      setTotalCount(data?.hits?.total)
      setLoading(false);
      return customerResponse;
    },
    enabled: !!filtersQuery.data, // only enabled when filters are fetched
    refetchOnWindowFocus: false,
  });

  return {
    filtersQuery,
    customersQuery,
    isLoading: filtersQuery.isLoading || customersQuery.isLoading,
    isError: filtersQuery.isError || customersQuery.isError,
  };
};