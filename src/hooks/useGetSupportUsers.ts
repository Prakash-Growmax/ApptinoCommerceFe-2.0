import useAppStore from "@/stores/appStore";
import useSupportStore from "@/stores/useSupportStore";
import { TokenPayload } from "@/types/auth.types";
import { ElasticSearchService } from "@/utils/Services/ElasticSearchServices";
import { useQuery } from "@tanstack/react-query";

export const useGetSupportFilters = (searchValue: string = '') => {
  const { setSupportData, setSupportLoading } = useSupportStore();

    const {payload}=useAppStore();
  const {tenantId} = payload as TokenPayload;

  const getSupportData = async (searchText: string) => {
    try {
      setSupportLoading(true);
      // If no search value provided, fetch all active customers
      const data = await ElasticSearchService.CustomerSearch(searchText || '', tenantId, true);
      const resData = ElasticSearchService.FormatResults(data);
       const updatedResData = resData.map((e: any) => {
        e["id"] = parseInt(e.companyID);
        e["name"] = e.companyName;
        e["profileAccess"] = e.profileAccess ? true : false;
        e["currency"] = {
          currencyCode: e.currencyCode,
          currencySymbol: e.currencySymbol,
        };
        return e;
      });
      setSupportData(updatedResData);
      return updatedResData;
    } catch (error) {
      console.error("Support search failed:", error);
      setSupportData([]);
      return [];
    } finally {
      setSupportLoading(false);
    }
  };

  const query = useQuery({
    queryKey: ["Supportfilters", searchValue],
    queryFn: () => getSupportData(searchValue),
    // Enable query even without searchValue to fetch all customers
    enabled: true,
  });
  return query;
};
