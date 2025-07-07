import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiPut } from '@/lib/api/client';
import { toast } from 'sonner';
import useAppStore from '@/stores/appStore';
import { UpdateCompanyRequest, UpdateCompanyResponse } from '../schema/company.schema';
import { AccountData } from '../types/company.types';

interface UpdateCompanyDetailsParams {
  companyId: number;
  data: UpdateCompanyRequest;
}

export const updateCompanyDetails = async ({ 
  companyId, 
  data,
  tenantId,
  token 
}: UpdateCompanyDetailsParams & { tenantId: string; token: string }): Promise<UpdateCompanyResponse> => {
  const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };
  
  const response = await apiPut<UpdateCompanyResponse>({
    url: `/corecommerce/companys/${companyId}`,
    data,
    config: {
      headers,
    }
  });
  
  return response;
};

export const useUpdateCompanyDetails = () => {
  const queryClient = useQueryClient();
  const { payload, accessToken } = useAppStore();

  return useMutation({
    mutationFn: ({ companyId, data }: UpdateCompanyDetailsParams) => 
      updateCompanyDetails({ 
        companyId, 
        data, 
        tenantId: payload?.tenantId || '', 
        token: accessToken || '' 
      }),
    onMutate: async ({ companyId, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['companyDetails', companyId] });

      // Snapshot the previous value
      const previousCompany = queryClient.getQueryData<{ data: AccountData }>(['companyDetails', companyId]);

      // Optimistically update to the new value
      if (previousCompany) {
        queryClient.setQueryData(['companyDetails', companyId], {
          ...previousCompany,
          data: {
            ...previousCompany.data,
            ...data,
          }
        });
      }

      // Return a context object with the snapshotted value
      return { previousCompany, companyId };
    },
    onError: (_, { companyId }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCompany) {
        queryClient.setQueryData(['companyDetails', companyId], context.previousCompany);
      }
      toast.error('Failed to update company details');
    },
    onSuccess: (_, { companyId }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['companyDetails', companyId] });
      toast.success('Company details updated successfully');
    },
  });
};