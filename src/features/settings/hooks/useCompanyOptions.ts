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