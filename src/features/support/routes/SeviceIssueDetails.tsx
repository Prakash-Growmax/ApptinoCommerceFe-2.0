import { FormInput, FormSelect, FormTextarea } from "@/components/molecules/ReactHookForm";
import { FormCalendar } from "@/components/molecules/ReactHookForm/Calendar/Calendar";
import { FormField } from "@/components/molecules/ReactHookForm/FormField/FormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { useSupportTicketFilterStore } from "../store/useSupportTicketFilterStore";

const ServiceIssueDetails = () => {
   const { status, category, fieldUser } = useSupportTicketFilterStore();
   const statusOptions = status?.map((s: string) => ({
  value: s?.trim(),
  label: s,
}));

const categoryOptions = category?.map((c: string) => ({
  value: c?.trim(),
  label: c,
}));
  return (
    <div className="flex justify-start">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <FormInput
                name="supportTicketData.category"
                label="Product Category"
                placeholder="Product Category"
              /> */}
              <FormSelect
                name="supportTicketData.category"
                label="Product Category"
                 placeholder="Product Category"
                 options={categoryOptions}
              />
              <FormInput
                name="supportTicketData.productSKUs.0"
                label="Product Details"
                placeholder="Product Details"
              
              />
              <FormInput
                name="supportTicketData.serialNumbers.0"
                label="Asset Serial Number"
                placeholder="Asset Serial Number"
              />
              <FormInput
                name="supportTicketData.referenceIdentifiers.0"
                label="Reference order no/Invoice No"
                placeholder="Reference order no/Invoice No"
              />
              <FormInput
                name="supportTicketData.reason"
                label="Reason"
                placeholder="Reason"
              />
              <FormSelect
                name="supportTicketData.status"
                label="Status"
                placeholder="Status"
                options={statusOptions}
              />
              {/* <FormInput
                name="supportTicketData.status"
                label="Status"
                placeholder="Status"
              /> */}
              <FormSelect
              name="supportTicketData.priority"
              label="Priority"
               placeholder="Select the priority"
                 options={[
                    { value: 'Low', label: 'Low' },
                    { value: 'Medium', label: 'Medium' },
                     { value: 'High', label: 'High' },
                  ]}
              />
              {/* <FormInput
                name="supportTicketData.priority"
                label="Priority"
                placeholder="Priority"
              /> */}
              <FormInput
                name="supportTicketData.ownerDetails.0.ownerName"
                label="Ticket Owner"
                placeholder="Ticket Owner"
              />
            </div>

            <div className="w-full">
              <FormTextarea
                name="supportTicketData.description"
                label="Problem Description"
                placeholder="Write a problem description"
              />
            </div>

            <div className="w-full md:w-1/2">
              <FormField
                name="supportTicketData.dueDateTime"
                label="Resolution Due Date"
              >
                {({ field }) => (
                  <FormCalendar {...field} />
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
