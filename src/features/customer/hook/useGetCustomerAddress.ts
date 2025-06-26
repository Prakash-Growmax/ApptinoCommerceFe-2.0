import { useQuery } from '@tanstack/react-query';

import useAppStore from '@/stores/appStore';
import { TokenPayload } from '@/types/auth.types';

import { getCurrencies } from '../api/currencies.api';
import { getCountry, getDistrict, getState } from '../api/customer.api';
import { useCustomerAddressStore } from '../store/useCustomerAddressStore';

export const useGetCustomerAddress = ({ open }) => {
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { userId, companyId, tenantId } = payload as TokenPayload;
  const { setStateList, setCountryList, setDistrictList, setCurrencyList } =
    useCustomerAddressStore();
  const getAllStateQuery = useQuery({
    queryKey: ['state', tenantId, open],
    queryFn: async () => {
      const response = await getState(tenantId, token);

      setStateList(response?.data);
      return response;
    },
    enabled: !!tenantId && !!open,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  const getAllDistrictQuery = useQuery({
    queryKey: ['district', tenantId, open],
    queryFn: async () => {
      const response = await getDistrict(tenantId, token);
      setDistrictList(response?.data);
      return response;
    },
    enabled: !!tenantId && !!open,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const getAllCountQuery = useQuery({
    queryKey: ['country', tenantId, open],
    queryFn: async () => {
      const response = await getCountry(tenantId, token);
      setCountryList(response?.data);
      return response;
    },
    enabled: !!tenantId && !!open,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const getCurrencyQuery = useQuery({
    queryKey: ['currencies', tenantId, open],
    queryFn: async () => {
      const response = await getCurrencies({ tenantId, token });

      const formatted = response.map(cur => ({
        value: cur.currencyCode,
        label: cur.currencyCode,
        fullData: cur,
      }));
      setCurrencyList(formatted);

      return formatted;
    },
    enabled: !!tenantId && open,
  });

  return {
    getAllStateQuery,
    getAllDistrictQuery,
    getAllCountQuery,
    getCurrencyQuery,
  };
};
