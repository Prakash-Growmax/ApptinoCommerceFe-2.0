import { FormProvider, useForm } from "react-hook-form";
import SupportCustomerCard from "../components/SupportCustomerCard/SupportCustomerCard";
import { useGetSupportTicketFieldServices } from "../hook/useGetSupportTicketFieldServices";
import { useGetSupportTicketDetails } from "../hook/useGetSupportTicketDetails";
import { useEffect } from "react";

const SupportCustomerDetails=()=>{
      const {
        data: fieldServicesData,
        isLoading: isFieldServicesLoading,
        error: fieldServicesError,
        refetch: refetchFieldServices,
      } = useGetSupportTicketFieldServices('siemensdev', 'ST0071');
    
      const {
        data: ticketDetailsData,
        isLoading: isTicketDetailsLoading,
        error: ticketDetailsError,
        refetch: refetchTicketDetails,
      } = useGetSupportTicketDetails('siemensdev', 'ST0071');
    
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
    return(
          <FormProvider {...methods}>
      Support Details
      <SupportCustomerCard />
    </FormProvider>
    )

}
export default SupportCustomerDetails;