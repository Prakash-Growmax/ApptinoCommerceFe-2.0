import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiPut } from '@/lib/api/client';
import useAppStore from '@/stores/appStore';

import {
  AccountFilterData,
  AccountFilterSchema,
} from '../schema/customer.schema';
import { AddressDetailsType } from '../types/address.type';

interface UpdateCustomerDetailsParams {
  customerId: number;
  data: AccountFilterData;
}

export const updateCustomerDetails = async ({
  customerId,
  data,
  tenantId,
  token

}: UpdateCustomerDetailsParams & { tenantId: string; token: string }): Promise<AccountFilterSchema> => {
  const response = await apiPut<AccountFilterSchema>({
    url: `/corecommerce/companys/${customerId}`,
    data,

  });

  return response;
};

export const useUpdateCustomerDetails = () => {
  const queryClient = useQueryClient();
  const { payload, accessToken } = useAppStore();

  return useMutation({
    mutationFn: ({ customerId, data }: UpdateCustomerDetailsParams) =>
      updateCustomerDetails({
        customerId,
        data,
        tenantId: payload?.tenantId || '',
        token: accessToken || '',
      }),

    onMutate: async ({ customerId, data }) => {
      await queryClient.cancelQueries({ queryKey: ['customerDetails', customerId] });

      const previousCustomer = queryClient.getQueryData<{ data: AddressDetailsType }>(['customerDetails', customerId]);

      if (previousCustomer) {
        queryClient.setQueryData(['customerDetails', customerId], {
          ...previousCustomer,
          data: {
            ...previousCustomer.data,
            ...data,
          },
        });
      }

      return { previousCustomer, customerId };
    },

    onError: (_, { customerId }, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(['customerDetails', customerId], context.previousCustomer);
      }
      toast.error('Failed to update customer details');
    },

    onSuccess: (_, { customerId }) => {
      queryClient.invalidateQueries({ queryKey: ['customerDetails', customerId] });
      toast.success('Customer details updated successfully');
    },
  });
};
