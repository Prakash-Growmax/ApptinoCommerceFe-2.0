import { useQuery } from '@tanstack/react-query';
import useCompanyBranchStore from '../store/useCompanyBranchStore';
import { Pagination } from '../types/company.types';
import { GetBranchDetails } from '../api/settings.api';
import useAppStore from '@/stores/appStore';
import { TokenPayload } from '@/types/auth.types';
import { SettingsBranchResponse } from '../schema/settingsBranch.schema';
import { settingsQueryKeys } from '../api/queries';

export const useGetBranchDetails = ({ searchString = '' }: Pagination = {}) => {
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { userId, companyId, tenantId } = payload as TokenPayload;
  const { page, rowPerPage } = useCompanyBranchStore();

  return useQuery<SettingsBranchResponse>({
    queryKey: settingsQueryKeys.branchList({
      companyId,
      userId,
      page,
      rowPerPage,
      searchString,
    }),
    queryFn: () => GetBranchDetails({ 
      userId, 
      companyId, 
      page, 
      rowPerPage, 
      searchString, 
      tenantId, 
      token 
    }),
    enabled: !!companyId && !!userId,
    refetchOnWindowFocus: false,
  });
};