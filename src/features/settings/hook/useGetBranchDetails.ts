import { useQuery } from '@tanstack/react-query';

import useUserStore from '@/stores/useUserStore';

import useCompanyBranchStore from '../store/useCompanyBranchStore';
import { Pagination } from '../types/company.types';

export const useGetBranchDetails = ({ searchString = '' }: Pagination = {}) => {
  const { companyId, tenantId, userId } = useUserStore();
  const { page, rowPerPage, setBranchData, setLoading, setTotalCount } =
    useCompanyBranchStore();

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

  const fetchBranch = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.myapptino.com/corecommerce/branches/readBranchwithPagination/${userId}?companyId=${companyId}&offset=${page}&limit=${rowPerPage}&searchString=${searchString}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-tenant': tenantId,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBranchData(data?.data?.branchResponse || []);
      setTotalCount(data?.data?.totalCount || 0);
      setLoading(false);

      return data;
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
