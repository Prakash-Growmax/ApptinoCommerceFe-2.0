import useUserStore from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import useCompanyStore from "../store/useCompanyStore";
import { GetCompanyDetails } from "../api/settings.api";
import useAppStore from "@/stores/appStore";
import { TokenPayload } from "@/types/auth.types";

export const useGetCompanyDetails = () => {
  const {accessToken,payload}=useAppStore();
  const token = accessToken as string;
  const { companyId, tenantId } = payload as TokenPayload;
  

  const { setCompanyData, setLoading } = useCompanyStore();

  const fetchCompany = async () => {
    try {
     
      setLoading(true);
      const response = await GetCompanyDetails({companyId,tenantId,token})
    
      setCompanyData(response?.data);
      setLoading(false);
      return response;
    } catch (error) {
      console.error("Error fetching company details", error);
      setLoading(false);
      return null;
    }
  };

  const query = useQuery({
    queryKey: ["company-details", companyId],
    queryFn: fetchCompany,
    enabled: !!companyId && !!tenantId && typeof window !== "undefined",
    refetchOnWindowFocus: false, // 👈 Prevent refetch on tab switch
  });

  return query;
};
