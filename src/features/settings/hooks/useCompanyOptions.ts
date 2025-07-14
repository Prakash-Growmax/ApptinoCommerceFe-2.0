import { useQuery } from '@tanstack/react-query';
import useAppStore from '@/stores/appStore';

interface Option {
  value: string;
  label: string;
}

interface CompanyOptionsData {
  businessTypes: Option[];
  accountTypes: Option[];
  currencies: Option[];
  subIndustries: Option[];
}

// Mock function - replace with actual API calls
const fetchCompanyOptions = async (tenantId: string, token: string): Promise<CompanyOptionsData> => {
  // These would be actual API calls to fetch the options
  // For now, returning empty arrays - implement actual API calls when endpoints are available
  return {
    businessTypes: [],
    accountTypes: [],
    currencies: [],
    subIndustries: [],
  };
};

export const useCompanyOptions = () => {
  const { payload, accessToken } = useAppStore();

  return useQuery({
    queryKey: ['companyOptions', payload?.tenantId],
    queryFn: () => fetchCompanyOptions(payload?.tenantId || '', accessToken || ''),
    enabled: !!payload?.tenantId && !!accessToken,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};




// import { useQuery } from '@tanstack/react-query';
// import useAppStore from '@/stores/appStore';
// import axios from 'axios';

// interface Option {
//   value: string;
//   label: string;
// }

// export const useCompanyOptions = () => {
//   const { payload, accessToken } = useAppStore();

//   const fetchSubIndustries = async (): Promise<Option[]> => {
//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//       'X-Tenant-Id': payload?.tenantId,
//     };

//     const res = await axios.get(
//       'https://p5w483ff4a.execute-api.ap-south-1.amazonaws.com/schwing_api/corecommerce/subindustrys',
//       { headers }
//     );

//     return res.data?.data?.map((si: any) => ({
//       value: si.id.toString(),
//       label: si.name,
//     })) || [];
//   };

//   return useQuery({
//     queryKey: ['subIndustries', payload?.tenantId],
//     queryFn: fetchSubIndustries,
//     enabled: false, // Lazy loading
//     staleTime: 30 * 60 * 1000,
//     gcTime: 60 * 60 * 1000,
//   });
// };
