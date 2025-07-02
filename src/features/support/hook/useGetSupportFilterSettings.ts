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
  const {setStatus, setPriority, setCategory,setFieldUser,setIssueCategory,setReason,setSeverity}=useSupportTicketFilterStore();

  const filtersQuery = useQuery({
    queryKey: ["status", tenantId],
    queryFn: async () => {
      const response = await getSupportTicketStatus(
        tenantId,
        token,
      );
     
      var data = JSON.parse(response[0].content)
      console.log(data);
      setCategory(data.tCategory)
      setIssueCategory(data?.fsCategory);
      setPriority(data.priority); 
      setReason(data?.reasons);
      setSeverity(data?.severity);
      setStatus(_.map(data.ticketStatus, 'status'))

      if (data.priority) {
      setPriority(data.priority); // e.g., ['Low', 'Medium', 'High']
    } else {
      setPriority(["Low", "Medium", "High"]); // fallback if priority is missing
    }
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
