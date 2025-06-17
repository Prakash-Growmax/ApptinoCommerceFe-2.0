import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { LoadingFallback } from '@/components/organisms/LoadingFallback/LoadingFallback';

import SupportCustomerCard from '../components/SupportCustomerCard/SupportCustomerCard';
import SupportTimeline from '../components/SupportTimeline/SupportTimeline';
import { useGetSupportTicketDetails } from '../hook/useGetSupportTicketDetails';
import { useGetSupportTicketFieldServices } from '../hook/useGetSupportTicketFieldServices';
import { useSupportTimeline } from '../hook/useGetSupportTimeline';
import ServiceDetails from './ServiceDetails';
import TicketHeader from './Serviceheader';
import { useGetSupportFilterSettings } from '../hook/useGetSupportFilterSettings';

const SupportDetails = () => {
  const { id } = useParams();
  const {
    data: fieldServicesData,
    isLoading: isFieldServicesLoading,
    error: fieldServicesError,
    refetch:refetchFieldData
  } = useGetSupportTicketFieldServices('dev3', id);

  const {
    data: ticketDetailsData,
    isLoading: isTicketDetailsLoading,
    error: ticketDetailsError,
    refetch: refetchTicketDetails,
  } = useGetSupportTicketDetails('dev3', id);
  const {
    data: ticketTimelineData,
    isLoading: isTicketTimelineLoadinf,
    error: ticketTimelineError,
  } = useSupportTimeline('dev3', id);

  const isLoading = isFieldServicesLoading || isTicketDetailsLoading;
  const error = fieldServicesError || ticketDetailsError;

  const methods = useForm({
    defaultValues: {
      fieldServicesData: null,
      supportTicketData: null,
    },
    mode: 'onChange',
  });
 useGetSupportFilterSettings();
  useEffect(() => {
    if (fieldServicesData && ticketDetailsData) {
      methods.reset({
        fieldServicesData,
        supportTicketData: ticketDetailsData,
        ticketTimelineData,
      });
    }
  }, [fieldServicesData, ticketDetailsData, ticketTimelineData]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error) {
    return <div className="p-4 text-sm text-red-600">Failed to load data</div>;
  }

  return (
    <FormProvider {...methods}>
      <TicketHeader />
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-8 p-4">
        <div className="w-full lg:w-2/3">
          <ServiceDetails refetchFieldData={refetchFieldData}/>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <SupportCustomerCard />
          <SupportTimeline />
        </div>
      </div>
    </FormProvider>
  );
};

export default SupportDetails;
