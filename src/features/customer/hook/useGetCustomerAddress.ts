
import { getBusinessTypes, getCustomerTags } from '../api/customer.api';
import { useQuery } from '@tanstack/react-query';

import useAppStore from '@/stores/appStore';
import { TokenPayload } from '@/types/auth.types';

import { getCurrencies } from '../api/currencies.api';
import { getCountry, getDistrict, getState } from '../api/customer.api';
import { getRoles } from '../api/customer.api';
import { useCustomerAddressStore } from '../store/useCustomerAddressStore';

export const useGetCustomerAddress = ({ open }: { open: boolean }) => {
  const { payload } = useAppStore();
  const { tenantId } = payload as TokenPayload;
  const {
    setStateList,
    setCountryList,
    setDistrictList,
    setCurrencyList,
    setRoleList,
    setBusinessTypeList,
    setCustomerTagsList,
  } = useCustomerAddressStore();
  const getAllStateQuery = useQuery({
    queryKey: ['state', tenantId, open],
    queryFn: async () => {
      const response = await getState(tenantId);
      
      const State = response?.data || response;

      setStateList(State);
      return response;
    },
    enabled: !!tenantId && !!open,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
  const getAllDistrictQuery = useQuery({
    queryKey: ['district', tenantId, open],
    queryFn: async () => {
      const response = await getDistrict(tenantId);
      
      const districts = response?.data || response;
      
      setDistrictList(districts);
      return response;
    },
    enabled: !!tenantId && !!open,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  const getAllCountQuery = useQuery({
    queryKey: ['country', tenantId, open],
    queryFn: async () => {
      const response = await getCountry(tenantId);

      setCountryList(response?.data);
      return response;

    },
    enabled: !!tenantId && !!open,
    refetchOnWindowFocus: false,
    placeholderData: previousData => previousData,
  });

  const getCurrencyQuery = useQuery({
    queryKey: ['currencies', tenantId, open],
    queryFn: async () => {
      const formatted = await getCurrencies({ tenantId });
      setCurrencyList(formatted);
      return formatted;
    },
    enabled: !!tenantId && open,
  });

  const getRolesQuery = useQuery({
    queryKey: ['roles', tenantId, open],
    queryFn: async () => {
      const response = await getRoles(tenantId);
      setRoleList(response as any[]);
      return response;
    },
    enabled: !!tenantId && open,
  });

  const getBusinessTypeQuery = useQuery({
    queryKey: ['businessTypes', tenantId, open],
    queryFn: async () => {
      const response = await getBusinessTypes(tenantId);
      setBusinessTypeList(response?.data);
      return response;
    },
    enabled: !!tenantId && open,
  });


  const getCustomerTagsQuery = useQuery({
    queryKey: ['customerTags', tenantId],
    queryFn: async () => {
      const response = await getCustomerTags(tenantId);
      setCustomerTagsList(response?.data ?? []);
      return response;
    },
    enabled: true,
  });

  return {
    getAllStateQuery,
    getAllDistrictQuery,
    getAllCountQuery,
    getCurrencyQuery,
    getRolesQuery,
    getBusinessTypeQuery,
    getCustomerTagsQuery,
  };
};
