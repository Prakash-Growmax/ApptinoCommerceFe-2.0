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
import ActionHeader from '@/components/molecules/ActionHeader/ActionHeader';
import { useSupportDetailStore } from '../store/useSupportDetailStore';
import { TokenPayload } from '@/types/auth.types';
import useAppStore from '@/stores/appStore';
import { updateTicket, updateTicketServices } from '../api/support.api';

const SupportDetails = () => {
  const { id } = useParams();
 const {
  updateSupportIssue,
  openSupportVisit,
  updateSupportVisit,
  openSupportIssue,
  setOpenSupportIssue
} = useSupportDetailStore();
console.log(updateSupportVisit);
console.log(openSupportIssue);
   const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const {tenantId} = payload as TokenPayload;
  const {
    data: fieldServicesData,
    isLoading: isFieldServicesLoading,
    error: fieldServicesError,
    refetch: refetchFieldData,
  } = useGetSupportTicketFieldServices('dev3', id);

  const {
    data: ticketDetailsData,
    isLoading: isTicketDetailsLoading,
    error: ticketDetailsError,
    refetch: refetchTicketDetails,
  } = useGetSupportTicketDetails('dev3', id);

  const {
    data: ticketTimelineData,
    isLoading: isTicketTimelineLoading,
    error: ticketTimelineError,
  } = useSupportTimeline('dev3', id);

  useGetSupportFilterSettings();

  const isLoading = isFieldServicesLoading || isTicketDetailsLoading;
  const error = fieldServicesError || ticketDetailsError;

  const methods = useForm({
    defaultValues: {
      fieldServicesData: null,
      supportTicketData: null,
    },
    mode: 'onChange',
  });
 


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
const matchedItem = fieldServicesData.find(
  (item) => item.identifier === updateSupportVisit?.identifier
);
  const updatedFieldPayload={
    ...matchedItem,
    appointmentFromDateTime:updateSupportVisit?.allFormValues?.appointmentFromDateTime,
    appointmentToDateTime:updateSupportVisit?.allFormValues?.appointmentToDateTime,
    category:updateSupportVisit?.allFormValues?.category,
    location:updateSupportVisit?.allFormValues?.location,
    ownerUsername:updateSupportVisit?.allFormValues?.ownerUsername,
    status:updateSupportVisit?.allFormValues?.status,
    title:updateSupportVisit?.allFormValues?.title,


  }
  const updateTicketPayload = {
    ...ticketDetailsData,
    category: updateSupportIssue?.category,
    description: updateSupportIssue?.description,
    dueDateTime: updateSupportIssue?.dueDateTime,
    priority: updateSupportIssue?.priority,
    productSKUs: [updateSupportIssue?.productDetails],
    reason: updateSupportIssue?.reason,
    referenceIdentifiers: [updateSupportIssue?.referenceIdentifier],
    serialNumbers: [updateSupportIssue?.serialNumber],
    status: updateSupportIssue?.status,
    ownerDetails: [
      {
        ...ticketDetailsData?.ownerDetails?.[0],
        ownerName: updateSupportIssue?.ticketOwner,
      },
    ],
  };

  const handleUpdateTicket = async() => {
   const response = await updateTicket(tenantId,token,updateTicketPayload)
   setOpenSupportIssue(false);
   
  };
  const handleUpdateFieldService=async()=>{
  const response = await updateTicketServices(tenantId,token,updatedFieldPayload);
  setOpenSupportIssue(false)
  }

  return (
    <FormProvider {...methods}>
      {(openSupportIssue || openSupportVisit) && (  <div className='px-4 py-2'>
         <ActionHeader handleSubmit={openSupportIssue ? handleUpdateTicket : handleUpdateFieldService} />

      </div>)}
    
     
      <TicketHeader />
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-8 lg:p-4">
        <div className="w-full lg:w-2/3">
          <ServiceDetails refetchFieldData={refetchFieldData} />
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
