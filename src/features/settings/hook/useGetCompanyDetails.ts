import useUserStore from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import useCompanyStore from "../store/useCompanyStore";

export const useGetCompanyDetails = () => {
  const { companyId, tenantId } = useUserStore();
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const { setCompanyData, setLoading } = useCompanyStore();

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.myapptino.com/corecommerce/companys/${companyId}`,
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
      setCompanyData(data?.data);
      setLoading(false);
      return data;
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
