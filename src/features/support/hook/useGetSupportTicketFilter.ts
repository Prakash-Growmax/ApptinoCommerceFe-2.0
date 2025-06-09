import useUserStore from "@/stores/useUserStore";
import useSupportStore from "../store/useSupportStore";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useEffect, useState } from "react";

export const useGetSupportTicketFilters = () => {
  const { userId, tenantId, companyId } = useUserStore();
  const token = localStorage.getItem("accessToken");
  const { page, rowPerPage, setLoading, setFilters, filters,setSupportData,setTotalCount} = useSupportStore();
  const [fetchFilter,setFetchFilter]=useState(true)
  // Query to get saved filters
  const filtersQuery = useQuery({
    queryKey: ["filters", userId, tenantId, page, rowPerPage],
    queryFn: async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.myapptino.com/corecommerce/templates/get?domainName=dev3&propertyName=${userId}_filters`,
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

      const data = await response.json();
      setFilters(data[0]?.content || {});
      setFetchFilter(false);
      return data[0]?.content;
    },
    enabled: !!companyId && !!userId,
    refetchOnWindowFocus: false,
  });
 const fetchSupportTickets=async()=>{
        let body = _.cloneDeep(filters);

      if (body.buyerCompanyName) {
        body.buyerCompanyName = _.map(filters.buyerCompanyName, "name");
      }

      const response = await fetch(
        `https://api.myapptino.com/support/service-support/filter?domainName=${tenantId}&page=${page}&size=${rowPerPage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": tenantId,
            Authorization: `Bearer ${token}`,
          },
          body:body,
        }
      );
       const data = await response.json();
       setSupportData(data?.result)
       setTotalCount(data?.count);
      setLoading(false)
 }
 useEffect(()=>{
  if(fetchFilter === false){
     fetchSupportTickets();
  }
 
 },[filters,fetchFilter,page,rowPerPage])
  // Query to fetch support tickets based on filters
  // const fetchSupportTickets = useQuery({
  //   queryKey: ["support-tickets", filters],
  //   queryFn: async () => {
  //     let body = _.cloneDeep(filters);

  //     if (body.buyerCompanyName) {
  //       body.buyerCompanyName = _.map(filters.buyerCompanyName, "name");
  //     }

  //     const response = await fetch(
  //       `https://api.myapptino.com/support/service-support/filter?domainName=${tenantId}&page=${page}&size=${rowPerPage}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-tenant": tenantId,
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body:body,
  //       }
  //     );
      
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data)
  //   },
  //   enabled: !!companyId && !!userId && !!filters,
  //   refetchOnWindowFocus: false,
  // });

  return { filtersQuery, fetchSupportTickets };
};
