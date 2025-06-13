import useAppStore from "@/stores/appStore";
import useSupportStore from "@/stores/useSupportStore";
import { TokenPayload } from "@/types/auth.types";
import { ElasticSearchService } from "@/utils/Services/ElasticSearchServices";
import { useQuery } from "@tanstack/react-query";
import { map } from "lodash";

export const useGetSupportFilters = () => {
  const { setSupportData, setSupportLoading } = useSupportStore();

    const {payload}=useAppStore();
  const {tenantId} = payload as TokenPayload;

  const getSupportData = async (searchValue: string ) => {
    try {
      setSupportLoading(true);
      const data = await ElasticSearchService.CustomerSearch(searchValue, tenantId, true);
      const resData = ElasticSearchService.FormatResults(data);
       const updatedResData = map(resData, (e) => {
        e["id"] = parseInt(e.companyID);
        e["name"] = e.companyName;
        e["profileAccess"] = e.isProfileAccess ? true : false;
        e["currencyId"] = {
          currencyCode: e.currencyCode,
          currencySymbol: e.currencySymbol,
        };
        return e;
      });
      setSupportData(updatedResData);
    } catch (error) {
      console.error("Support search failed:", error);
    } finally {
      setSupportLoading(false);
    }
  };

  const query = useQuery({
    queryKey: ["Supportfilters" ],
    queryFn:getSupportData,
  });
  return query;
};
