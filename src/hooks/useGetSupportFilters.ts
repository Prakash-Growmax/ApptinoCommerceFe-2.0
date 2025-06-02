
import useSupportUserStore from "@/stores/useSupportUserStore";
import { useQuery } from "@tanstack/react-query";

export const useGetSupportFilters = () => {
  const { userId, companyId, tenantId } = useSupportUserStore();
  const token = localStorage.getItem("accessToken");

  const fetchSupportFilters = async () => {
    try {
      const response = await fetch(
        `https://api.myapptino.com/service-support/filters/fetchAllAccountsFilterByUser?userId=${userId}&companyId=${companyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": tenantId,
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Support Filters:", data);
      return data;
    } catch (error) {
      console.error("Error fetching support filters", error);
      return null;
    }
  };

  const query = useQuery({
    queryKey: ["support-filters", userId, companyId],
    queryFn: fetchSupportFilters,
    enabled: !!userId && !!companyId && !!tenantId, // ensures values are available
  });

  return query;
};
