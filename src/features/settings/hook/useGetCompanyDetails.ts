import useUserStore from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import useCompanyStore from "../store/useCompanyStore";
import { GetCompanyDetails } from "../api/settings.api";

export const useGetCompanyDetails = () => {
  const { companyId, tenantId } = useUserStore();
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
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
