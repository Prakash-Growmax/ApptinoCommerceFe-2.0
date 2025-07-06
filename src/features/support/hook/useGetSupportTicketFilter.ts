import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { cloneDeep } from '@/utils/object';
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
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchFilters = async (signal?: AbortSignal) => {
    if (isFetching.current || signal?.aborted) return;
    isFetching.current = true;
    
    setLoading(true);
    try {
      const response = await GetSupportFilter({ userId, tenantId, token });
      if (!signal?.aborted) {
        setFilters(response[0]?.content || {});
        isInitialLoadDone.current = true;
      }
      return response[0]?.content;
    } catch (error) {
      if (!signal?.aborted) {
        console.error('Error fetching filters:', error);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
      isFetching.current = false;
    }
  };

  const fetchTickets = async (signal?: AbortSignal) => {
    if (!isInitialLoadDone.current || isFetching.current || signal?.aborted) return;
    isFetching.current = true;
    
    setLoading(true);
    try {
      const body = cloneDeep(filters);
      if (body.buyerCompanyName) {
        body.buyerCompanyName = filters.buyerCompanyName.map((item: any) => item.name);
      }
      
      const response = await GetFetchSupportTicket({
        tenantId,
        page,
        rowPerPage,
        body,
        token,
      });

      if (!signal?.aborted) {
        setSupportData(response?.result);
        setTotalCount(response?.count);
      }
      return response;
    } catch (error) {
      if (!signal?.aborted) {
        console.error('Error fetching tickets:', error);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
      isFetching.current = false;
    }
  };

  // Initial load and route change handler
  useEffect(() => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const loadData = async () => {
      await fetchFilters(signal);
      await fetchTickets(signal);
    };

    loadData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [location.key]); // Trigger on route changes

  // Handle filters/pagination changes
  useEffect(() => {
    if (isInitialLoadDone.current) {
      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      fetchTickets(signal);

      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      };
    }
  }, [filters, page, rowPerPage]);

  return {
    fetchFilters: () => fetchFilters(abortControllerRef.current?.signal),
    fetchTickets: () => fetchTickets(abortControllerRef.current?.signal),
    refetchAll: async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      
      await fetchFilters(signal);
      await fetchTickets(signal);
    },
    isInitialLoadDone: isInitialLoadDone.current
  };
};