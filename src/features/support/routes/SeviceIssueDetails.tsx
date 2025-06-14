import { FormInput, FormSelect, FormTextarea } from "@/components/molecules/ReactHookForm";
import { FormCalendar } from "@/components/molecules/ReactHookForm/Calendar/Calendar";
import { FormField } from "@/components/molecules/ReactHookForm/FormField/FormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useState, useRef } from "react";

const ServiceIssueDetails = () => {
  const { watch } = useFormContext();
 
  const supportTicketData = watch("supportTicketData") ?? [];
  const methods = useForm({
    defaultValues: {
      name: "",
      website: "",
      taxId: "",
      businessType: "",
      accountType: "",
      defaultCurrency: "",
      subIndustry: "",
      industryDescription: "",
    },
  });

  

  return (
    <div className="flex justify-start">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form className="flex flex-col gap-1">
                <div className="flex w-full justify-between gap-2">
                  <FormInput
                    name="Product Category"
                    label="Product Category"
                    className="text-gray-700 w-1/2"
                    placeholder="Product Category"
                    value={supportTicketData?.category ?? ""}
                  />
                  <FormInput
                    name="Product Details"
                    label="Product Details"
                    className="text-gray-700 w-1/2"
                    placeholder="ProductDetails"
                    value={supportTicketData?.productSKUs?.[0] ?? ""}
                  />
                 
                </div>
                <div className="flex w-full justify-between gap-2">
                        <FormInput
                    name="Asset Serial Number"
                    label="Asset Serial Number"
                    className="text-gray-700 w-1/2"
                    placeholder="Asset Serial Number"
                    value={supportTicketData?.serialNumbers?.[0] ?? ""}
                  />
                          <FormInput
                    name="Reference order no/Invoice No"
                    label="Reference order no/Invoice No"
                    className="text-gray-700 w-1/2"
                    placeholder="Reference order no/Invoice No"
                    value={supportTicketData?.referenceIdentifiers?.[0] ?? ""}
                  />
                </div>

                   <div className="flex w-full justify-between gap-2">
                  <FormInput
                    name="Reason"
                    label="Reason"
                    className="text-gray-700 w-1/2"
                    placeholder="Reason"
                    value={supportTicketData?.reason ?? ""}
                  />
                     <FormInput
                    name="Status"
                    label="Status"
                    className="text-gray-700 w-1/2"
                    placeholder="Status"
                    value={supportTicketData?.status ?? ""}
                  />
                 
                </div>

                <div className="flex w-full">
                  <FormTextarea
                    name="Problem Description"
                    label="Problem Description"
                    className="text-gray-700 w-full"
                    placeholder="Write a problem description"
                    value={supportTicketData?.description ?? ""}
                  />
                </div>

              

                <div className="flex w-full justify-between gap-2">
                      <FormInput
                    name="Priority"
                    label="Priority"
                    className="text-gray-700 w-1/2"
                    placeholder="Priority"
                    value={supportTicketData?.priority ?? ""}
                  />
                       <FormInput
                    name="Ticket Owner"
                    label="Ticket Owner"
                    className="text-gray-700 w-1/2"
                    placeholder="Ticket Owner"
                    value={supportTicketData?.ownerDetails?.[0]?.ownerName ?? ""}
                  />
                  {/* <FormTextarea
                    name="Initial Diagnosis notes"
                    label="Initial Diagnosis notes"
                    className="text-gray-700 w-full"
                    placeholder="Write a diagnosis note"
                  /> */}
                </div>
                  <div className="flex w-full justify-between gap-2">
                
                  <FormField
                    name="Resolution Due Date"
                    label="Resolution Due Date"
                    className="text-gray-700 w-3/5"
                  >
                    {({ field }) => (
                      <FormCalendar value={supportTicketData?.dueDateTime ?? ""} onChange={field.onChange} />
                    )}
                  </FormField> 
                </div>

 
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceIssueDetails;
