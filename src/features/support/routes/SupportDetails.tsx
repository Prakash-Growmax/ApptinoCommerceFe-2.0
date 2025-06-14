import { FormProvider, useForm } from "react-hook-form";
import SupportCustomerCard from "../components/SupportCustomerCard/SupportCustomerCard";
import ServiceDetails from "./ServiceDetails";
import { useGetSupportTicketFieldServices } from "../hook/useGetSupportTicketFieldServices";
import { useGetSupportTicketDetails } from "../hook/useGetSupportTicketDetails";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";




const SupportDetails = () => {
  const { id } = useParams();
 
  const {
    data: fieldServicesData,
    isLoading: isFieldServicesLoading,
    error: fieldServicesError,
    refetch: refetchFieldServices,
  } = useGetSupportTicketFieldServices('dev3', id);

  const {
    data: ticketDetailsData,
    isLoading: isTicketDetailsLoading,
    error: ticketDetailsError,
    refetch: refetchTicketDetails,
  } = useGetSupportTicketDetails('dev3', id);

  const isLoading = isFieldServicesLoading || isTicketDetailsLoading;
  const error = fieldServicesError || ticketDetailsError;

  const methods = useForm({
    defaultValues: {
      fieldServicesData: null,
      supportTicketData: null,
    },
       mode: "onChange",
  });

  useEffect(() => {
    if (fieldServicesData && ticketDetailsData) {
      methods.reset({
        fieldServicesData,
        supportTicketData: ticketDetailsData,
      });
    }
  }, [fieldServicesData, ticketDetailsData]);
  
  if (isLoading) {
    return <div className="flex justify-center">
       <Loader2
            className="h-20 w-20 animate-spin"
            data-testid="loading-spinner"
          />
    </div>; 
  }

  if (error) {
    return <div className="p-4 text-sm text-red-600">Failed to load data</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex w-full gap-8">
        <ServiceDetails />
        <SupportCustomerCard/>
      </div>
    </FormProvider>
  );
};

export default SupportDetails;