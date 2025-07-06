import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import SupportCustomerCard from '../components/SupportCustomerCard/SupportCustomerCard';
import { useGetSupportTicketDetails } from '../hook/useGetSupportTicketDetails';
import { useGetSupportTicketFieldServices } from '../hook/useGetSupportTicketFieldServices';

const SupportCustomerDetails = () => {
  const {
    data: fieldServicesData,
    isLoading: isFieldServicesLoading,
    error: fieldServicesError,
    refetch: refetchFieldServices,
  } = useGetSupportTicketFieldServices('dev3', 'ST0071');

  const {
    data: ticketDetailsData,
    isLoading: isTicketDetailsLoading,
    error: ticketDetailsError,
    refetch: refetchTicketDetails,
  } = useGetSupportTicketDetails('dev3', 'ST0071');

  const isLoading = isFieldServicesLoading || isTicketDetailsLoading;
  const error = fieldServicesError || ticketDetailsError;

  const methods = useForm({
    defaultValues: { fieldServicesData: null, supportTicketData: null },
  });

  useEffect(() => {
    methods.reset({
      fieldServicesData: fieldServicesData,
      supportTicketData: ticketDetailsData,
    });
  }, [methods]);
  return (
    <FormProvider {...methods}>
      Support Details
      <SupportCustomerCard />
    </FormProvider>
  );
};
export default SupportCustomerDetails;
