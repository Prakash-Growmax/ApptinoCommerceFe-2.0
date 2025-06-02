import { AccountElastic } from "@/features/customer/api/AccountElastics";
import { ElasticSearchServices } from "@/features/customer/api/ElasticSearchServices";
import useAccountsStore from "@/stores/useAccountStore";

import useUserStore from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomers = ({ filters }) => {
  const { setData,setLoading } = useAccountsStore();
  const {tenantId}=useUserStore()
  const fetchCustomers = async () => {

    const elasticData = AccountElastic.BuildCustomerquery(filters);
 
    const data = await ElasticSearchServices.CustomerGet(elasticData,tenantId);
 
    const customerResponse = ElasticSearchServices.FormatResults(data);
    setData(customerResponse);
    setLoading(false);
    return customerResponse;
    
  };

  const query = useQuery({
    queryKey: ["customers", filters],
    queryFn: fetchCustomers,
    enabled: !!filters && Object.keys(filters).length > 0, // only run when filters exist
  });

  return query;
};