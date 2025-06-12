import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import useAccountsStore from "@/stores/useAccountStore";
import useUserStore from "@/stores/useUserStore";
import { CustomerFilters } from "../api/customer.api";
import { AccountElastic } from "../api/AccountElastics";
import { ElasticSearchServices } from "../api/ElasticSearchServices";
import useAppStore from "@/stores/appStore";
import { TokenPayload } from "@/types/auth.types";

export const useFetchCustomersWithFilters = () => {
   const {accessToken,payload}=useAppStore();
  const token = accessToken as string;
  const {userId,companyId,tenantId } = payload as TokenPayload;

  const {
    setFilters,
    setData,
    setLoading,
    setTotalCount,
    page,
    rowPerPage,
    filters,
  } = useAccountsStore();

  // Memoized query key for filters
  const filtersQueryKey = useMemo(
    () => ["filters", userId, tenantId, companyId, page, rowPerPage],
    [userId, tenantId, companyId, page, rowPerPage]
  );

 
  const filtersEnabled = !!userId && !!tenantId && !!companyId && !!token;

  // STEP 1: Fetch filters
  const filtersQuery = useQuery({
    queryKey: filtersQueryKey,
    queryFn: async () => {
      setLoading(true);
      const response = await CustomerFilters({
        userId,
        companyId,
        tenantId,
        token,
      });

      let data;
      if (!response?.data?.limit) {
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

      const resFilters = response?.data?.limit ? response?.data : data;

      setFilters({
        ...resFilters,
        limit: rowPerPage,
        offset: page,
      });

      return resFilters;
    },
    enabled: filtersEnabled,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const customersQuery = useQuery({
    queryKey: ["customers", filters],
    queryFn: async () => {
      setLoading(true)
      const elasticData = AccountElastic.BuildCustomerquery(filters);
      const data = await ElasticSearchServices.CustomerGet(elasticData, tenantId);
      const customerResponse = ElasticSearchServices.FormatResults(data);

      setData(customerResponse);
      setTotalCount(data?.hits?.total || 0);
      setLoading(false);

      return customerResponse;
    },
    enabled: !!filtersQuery.data,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return {
    filtersQuery,
    customersQuery,
    isLoading: filtersQuery.isLoading || customersQuery.isLoading,
    isError: filtersQuery.isError || customersQuery.isError,
  };
};
