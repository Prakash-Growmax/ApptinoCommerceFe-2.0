import useAppStore from "@/stores/appStore";
import { TokenPayload } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";
import { getSupportTicketStatus } from "../api/support.api";
import { useSupportTicketFilterStore } from "../store/useSupportTicketFilterStore";
import _ from "lodash";

export const useGetSupportFilterSettings = () => {
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const {tenantId } = payload as TokenPayload;
  const {setStatus,setCategory}=useSupportTicketFilterStore();

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

  return filtersQuery;
};
