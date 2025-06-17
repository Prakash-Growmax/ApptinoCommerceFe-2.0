import useAppStore from "@/stores/appStore";
import { TokenPayload } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";
import { getSupportFieldServiceRep, getSupportTicketStatus } from "../api/support.api";
import { useSupportTicketFilterStore } from "../store/useSupportTicketFilterStore";
import _ from "lodash";

export const useGetSupportFilterSettings = () => {
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const {tenantId ,companyId} = payload as TokenPayload;
  const {setStatus,setCategory,setFieldUser}=useSupportTicketFilterStore();

  const filtersQuery = useQuery({
    queryKey: ["status", tenantId],
    queryFn: async () => {
      const response = await getSupportTicketStatus(
        tenantId,
        token,
      );
      
      var data = JSON.parse(response[0].content)
     
      setCategory(data.tCategory)
      setStatus(_.map(data.ticketStatus, 'status'))
    },
    enabled: !!tenantId,
    refetchOnWindowFocus: false,
  });

    const fetchServiceRep = useQuery({
    queryKey: ["seviceRep", tenantId,companyId],
    queryFn: async () => {
      const response = await getSupportFieldServiceRep(
        tenantId,
        token,
        companyId
      );
     setFieldUser(_.filter(response.data, "isActive"))
    },
    enabled: !!tenantId && !!companyId,
    refetchOnWindowFocus: false,
  });

  return {filtersQuery,fetchServiceRep};
};
