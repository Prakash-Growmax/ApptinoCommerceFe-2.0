import useAppStore from "@/stores/appStore";
import { TokenPayload } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";
import { getSupportFieldServiceRep, getSupportTicketStatus } from "../api/support.api";
import { useSupportTicketFilterStore } from "../store/useSupportTicketFilterStore";

export const useGetSupportFilterSettings = () => {
  const { payload } = useAppStore();
  const {tenantId ,companyId} = payload as TokenPayload;
  const {setStatus, setPriority, setCategory,setFieldUser,setIssueCategory,setReason,setSeverity}=useSupportTicketFilterStore();

  const filtersQuery = useQuery({
    queryKey: ["status", tenantId],
    queryFn: async () => {
      const response = await getSupportTicketStatus(
        tenantId
      );
     
      var data = JSON.parse((response as any)[0].content)
      console.log(data);
      setCategory(data.tCategory)
      setIssueCategory(data?.fsCategory);
      setPriority(data.priority); 
      setReason(data?.reasons);
      setSeverity(data?.severity);
      setStatus(data.ticketStatus.map((item: any) => item.status))

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
        companyId
      );
     setFieldUser((response as any).data.filter((item: any) => item.isActive))
    },
    enabled: !!tenantId && !!companyId,
    refetchOnWindowFocus: false,
  });

  return {filtersQuery,fetchServiceRep};
};
