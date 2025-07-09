import useUserStore from "@/stores/useUserStore";
import useSupportStore from "@/stores/useSupportStore";
import { useQuery } from "@tanstack/react-query";
import { GetSupportFilter } from "@/features/support/api/support.api";

export const useGetSupportFilters = () => {
  const { userId, tenantId } = useUserStore();
  const { setFilters, setLoading } = useSupportStore();

  const fetchFilters = async () => {
    setLoading(true);
    try {
      const data = await GetSupportFilter({ userId, tenantId });
      
      // Assuming filters come in data.data or data (adjust if different)
      const filters = data?.data || {
        status: "all",
        search: "",
        limit: 20,
        offset: 0,
      };

      setFilters(filters);
      setLoading(false);
      return filters;
    } catch (error) {
      console.error("Error fetching support filters", error);
      setLoading(false);
      return null;
    }
  };

  const query = useQuery({
    queryKey: ["supportFilters", userId, tenantId],
    queryFn: fetchFilters,
    enabled: !!userId && !!tenantId,
  });

  return query;
};