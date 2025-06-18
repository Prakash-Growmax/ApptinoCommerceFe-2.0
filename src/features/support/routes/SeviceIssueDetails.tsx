import { FormInput, FormSelect, FormTextarea } from "@/components/molecules/ReactHookForm";
import { FormCalendar } from "@/components/molecules/ReactHookForm/Calendar/Calendar";
import { FormField } from "@/components/molecules/ReactHookForm/FormField/FormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { useSupportTicketFilterStore } from "../store/useSupportTicketFilterStore";
import { useEffect, useMemo, useRef } from "react";
import { useSupportDetailStore } from "../store/useSupportDetailStore";
import isEqual from "lodash/isEqual"; // ✅ import lodash comparison utility

const ServiceIssueDetails = () => {
  const { 
    formState: { isDirty, dirtyFields, isValid },
    watch,
    getValues
  } = useFormContext();
  
  const { status, category, reason } = useSupportTicketFilterStore();
 const {
  updateSupportIssue,
  setUpdateSupportIssue,
  openSupportIssue,
  setOpenSupportIssue
} = useSupportDetailStore();


  // Watch form fields
  const watchedFields = watch([
    'supportTicketData.category',
    'supportTicketData.status',
    'supportTicketData.reason',
    'supportTicketData.priority',
    'supportTicketData.description',
    'supportTicketData.productSKUs.0',
    'supportTicketData.serialNumbers.0',
    'supportTicketData.referenceIdentifiers.0',
    'supportTicketData.ownerDetails.0.ownerName',
    'supportTicketData.dueDateTime'
  ]);

  // Memoize updated field values
  const getUpdatedValuesWithParams = useMemo(() => {
    const allValues = getValues();
    const supportTicketData = allValues.supportTicketData || {};
    
    const updatedValues = {};

    if (dirtyFields.supportTicketData?.category || supportTicketData.category) {
      updatedValues.category = supportTicketData.category;
    }

    if (dirtyFields.supportTicketData?.status || supportTicketData.status) {
      updatedValues.status = supportTicketData.status;
    }

    if (dirtyFields.supportTicketData?.reason || supportTicketData.reason) {
      updatedValues.reason = supportTicketData.reason;
    }

    if (dirtyFields.supportTicketData?.priority || supportTicketData.priority) {
      updatedValues.priority = supportTicketData.priority;
    }

    if (dirtyFields.supportTicketData?.description || supportTicketData.description) {
      updatedValues.description = supportTicketData.description;
    }

    if (dirtyFields.supportTicketData?.productSKUs?.[0] || supportTicketData.productSKUs?.[0]) {
      updatedValues.productDetails = supportTicketData.productSKUs?.[0];
    }

    if (dirtyFields.supportTicketData?.serialNumbers?.[0] || supportTicketData.serialNumbers?.[0]) {
      updatedValues.serialNumber = supportTicketData.serialNumbers?.[0];
    }

    if (dirtyFields.supportTicketData?.referenceIdentifiers?.[0] || supportTicketData.referenceIdentifiers?.[0]) {
      updatedValues.referenceIdentifier = supportTicketData.referenceIdentifiers?.[0];
    }

    if (dirtyFields.supportTicketData?.ownerDetails?.[0]?.ownerName || supportTicketData.ownerDetails?.[0]?.ownerName) {
      updatedValues.ticketOwner = supportTicketData.ownerDetails?.[0]?.ownerName;
    }

    if (dirtyFields.supportTicketData?.dueDateTime || supportTicketData.dueDateTime) {
      updatedValues.dueDateTime = supportTicketData.dueDateTime;
    }

    return {
      updatedValues,
      isDirty,
      isValid,
      dirtyFieldsCount: Object.keys(updatedValues).length
    };
  }, [watchedFields, dirtyFields, isDirty, isValid, getValues]);

  // Store previous values to avoid infinite loops
  const prevValuesRef = useRef();

  useEffect(() => {
    const currentValues = getUpdatedValuesWithParams?.updatedValues;

    // Only call setUpadateSupportIssue if the values have changed
    if (!isEqual(prevValuesRef.current, currentValues)) {
      prevValuesRef.current = currentValues;
       setUpdateSupportIssue(currentValues);
       console.log(currentValues);
    
    }
  }, [getUpdatedValuesWithParams]);
  useEffect(()=>{
   if(isDirty){
  setOpenSupportIssue(true);
   }
  },[isDirty])

  const statusOptions = status?.map((s: string) => ({
    value: s?.trim(),
    label: s,
  }));

  const categoryOptions = category?.map((c: string) => ({
    value: c?.trim(),
    label: c,
  }));

  const reasonOptions = reason?.map((r: string) => ({
    value: r?.trim(),
    label: r,
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
              <FormSelect
                name="supportTicketData.reason"
                label="Reason"
                placeholder="Reason"
                options={reasonOptions}
              />
              <FormSelect
                name="supportTicketData.status"
                label="Status"
                placeholder="Status"
                options={statusOptions}
              />
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
                {({ field }) => <FormCalendar {...field} />}
              </FormField>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceIssueDetails;
