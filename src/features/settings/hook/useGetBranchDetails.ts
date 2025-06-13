import { useQuery } from '@tanstack/react-query';

import useUserStore from '@/stores/useUserStore';

import useCompanyBranchStore from '../store/useCompanyBranchStore';
import { Pagination } from '../types/company.types';
import { GetBranchDetails } from '../api/settings.api';
import useAppStore from '@/stores/appStore';
import { TokenPayload } from '@/types/auth.types';

export const useGetBranchDetails = ({ searchString = '' }: Pagination = {}) => {
  const {accessToken,payload}=useAppStore();
  const token = accessToken as string;
  const {userId,companyId,tenantId } = payload as TokenPayload;
  const { page, rowPerPage, setBranchData, setLoading, setTotalCount } =
    useCompanyBranchStore();

 

  const fetchBranch = async () => {
    try {
      setLoading(true);

       const response = await GetBranchDetails({userId,companyId,page,rowPerPage,searchString,tenantId,token})
   
      setBranchData(response?.data?.branchResponse || []);
      setTotalCount(response?.data?.totalCount || 0);
      setLoading(false);

      return response;
    } catch (error) {
      console.error('Error fetching branches', error);
      setLoading(false);
      return null;
    }
  };

  const query = useQuery({
    queryKey: [
      'branch-details',
      companyId,
      userId,
      page,
      rowPerPage,
      searchString,
    ],
    queryFn: fetchBranch,
    enabled: !!companyId && !!userId, // prevents running query without valid IDs
    refetchOnWindowFocus: false,
  });

  return query;
};
