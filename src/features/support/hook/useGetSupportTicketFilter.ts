import useUserStore from "@/stores/useUserStore";
import useSupportStore from "../store/useSupportStore";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useEffect, useState } from "react";
import { GetFetchSupportTicket, GetSupportFilter } from "../api/support.api";

import { useRef } from "react";

export const useGetSupportTicketFilters = () => {
  const { userId, tenantId, companyId } = useUserStore();
  const token = localStorage.getItem("accessToken");
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

  const filtersQuery = useQuery({
    queryKey: ["filters", userId, tenantId],
    queryFn: async () => {
      setLoading(true);
      const response = await GetSupportFilter({ userId, tenantId, token });
      setFilters(response[0]?.content || {});
      isInitialLoadDone.current = true;
      setLoading(false);
      return response[0]?.content;
    },
    enabled: !!companyId && !!userId,
    refetchOnWindowFocus: false,
  });

  const fetchSupportTickets = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    if (isInitialLoadDone.current) {
      fetchSupportTickets();
    }
  }, [filters, page, rowPerPage]);

  return { filtersQuery, fetchSupportTickets };
};
