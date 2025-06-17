import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import { GetFetchSupportTicket, GetSupportFilter } from "../api/support.api";
import useAppStore from "@/stores/appStore";
import { TokenPayload } from "@/types/auth.types";
import useSupportStore from "../store/useSupportStore";

export const useGetSupportTicketFilters = () => {
  const location = useLocation();
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { userId, companyId, tenantId } = payload as TokenPayload;
  const {
    page,
    rowPerPage,
    setLoading,
    setFilters,
    filters,
    setSupportData,
    setTotalCount,
  } = useSupportStore();

  const isInitialLoadDone = useRef(false);
  const isFetching = useRef(false);

  const fetchFilters = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    
    setLoading(true);
    try {
      const response = await GetSupportFilter({ userId, tenantId, token });
      setFilters(response[0]?.content || {});
      isInitialLoadDone.current = true;
      return response[0]?.content;
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  const fetchTickets = async () => {
    if (!isInitialLoadDone.current || isFetching.current) return;
    isFetching.current = true;
    
    setLoading(true);
    try {
      const body = _.cloneDeep(filters);
      if (body.buyerCompanyName) {
        body.buyerCompanyName = _.map(filters.buyerCompanyName, "name");
      }
      
      const response = await GetFetchSupportTicket({
        tenantId,
        page,
        rowPerPage,
        body,
        token,
      });

      setSupportData(response?.result);
      setTotalCount(response?.count);
      return response;
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  // Initial load and route change handler
  useEffect(() => {
    const loadData = async () => {
      await fetchFilters();
      await fetchTickets();
    };

    loadData();
  }, [location.key]); // Trigger on route changes

  // Handle filters/pagination changes
  useEffect(() => {
    if (isInitialLoadDone.current) {
      fetchTickets();
    }
  }, [filters, page, rowPerPage]);

  return {
    fetchFilters,
    fetchTickets,
    refetchAll: async () => {
      await fetchFilters();
      await fetchTickets();
    },
    isInitialLoadDone: isInitialLoadDone.current
  };
};