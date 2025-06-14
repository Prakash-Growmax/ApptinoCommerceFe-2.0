import { FormInput,FormTextarea } from "@/components/molecules/ReactHookForm";
import { FormCalendar } from "@/components/molecules/ReactHookForm/Calendar/Calendar";
import { FormField } from "@/components/molecules/ReactHookForm/FormField/FormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";


const ServiceIssueDetails = () => {
  const { watch } = useFormContext();
  const supportTicketData = watch("supportTicketData") ?? [];
  
  return (
    <div className="flex justify-start">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="Product Category"
                label="Product Category"
                className="text-gray-700"
                placeholder="Product Category"
                value={supportTicketData?.category ?? ""}
              />
              <FormInput
                name="Product Details"
                label="Product Details"
                className="text-gray-700"
                placeholder="ProductDetails"
                value={supportTicketData?.productSKUs?.[0] ?? ""}
              />
              <FormInput
                name="Asset Serial Number"
                label="Asset Serial Number"
                className="text-gray-700"
                placeholder="Asset Serial Number"
                value={supportTicketData?.serialNumbers?.[0] ?? ""}
              />
              <FormInput
                name="Reference order no/Invoice No"
                label="Reference order no/Invoice No"
                className="text-gray-700"
                placeholder="Reference order no/Invoice No"
                value={supportTicketData?.referenceIdentifiers?.[0] ?? ""}
              />
              <FormInput
                name="Reason"
                label="Reason"
                className="text-gray-700"
                placeholder="Reason"
                value={supportTicketData?.reason ?? ""}
              />
              <FormInput
                name="Status"
                label="Status"
                className="text-gray-700"
                placeholder="Status"
                value={supportTicketData?.status ?? ""}
              />
              <FormInput
                name="Priority"
                label="Priority"
                className="text-gray-700"
                placeholder="Priority"
                value={supportTicketData?.priority ?? ""}
              />
              <FormInput
                name="Ticket Owner"
                label="Ticket Owner"
                className="text-gray-700"
                placeholder="Ticket Owner"
                value={supportTicketData?.ownerDetails?.[0]?.ownerName ?? ""}
              />
            </div>
            
            <div className="w-full">
              <FormTextarea
                name="Problem Description"
                label="Problem Description"
                className="text-gray-700"
                placeholder="Write a problem description"
                value={supportTicketData?.description ?? ""}
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <FormField
                name="Resolution Due Date"
                label="Resolution Due Date"
                className="text-gray-700"
              >
                {({ field }) => (
                  <FormCalendar value={supportTicketData?.dueDateTime ?? ""} onChange={field.onChange} />
                )}
              </FormField> 
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceIssueDetails;
