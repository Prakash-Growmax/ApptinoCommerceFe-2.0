import { useEffect, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { isEqual } from '@/utils/object';

import {
  FormInput,
  FormSelect,
  FormTextarea,
} from '@/components/molecules/ReactHookForm';
import { FormCalendar } from '@/components/molecules/ReactHookForm/Calendar/Calendar';
import { FormField } from '@/components/molecules/ReactHookForm/FormField/FormField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useSupportDetailStore } from '../store/useSupportDetailStore';
import { useSupportTicketFilterStore } from '../store/useSupportTicketFilterStore';

// ✅ import lodash comparison utility

const ServiceIssueDetails = () => {
  const {
    formState: { isDirty, dirtyFields, isValid },
    watch,
    getValues,
  } = useFormContext();

  const { status, category, reason } = useSupportTicketFilterStore();
  const {
    updateSupportIssue,
    setUpdateSupportIssue,
    openSupportIssue,
    setOpenSupportIssue,
  } = useSupportDetailStore();

  // Watch form fields
  const watchedFields = watch([
    'supportTicketData.priority',
    'supportTicketData.status',
    'supportTicketData.severity',
    'supportTicketData.reason',
    'supportTicketData.source',
     'supportTicketData.tags',
    'supportTicketData.category',
    'supportTicketData.description',
    'supportTicketData.productSKUs.0',
    'supportTicketData.serialNumbers.0',
    'supportTicketData.referenceIdentifiers.0',
    'supportTicketData.ownerDetails.0.ownerName',
    'supportTicketData.dueDateTime',
  ]);

  // Memoize updated field values
  const getUpdatedValuesWithParams = useMemo(() => {
    const allValues = getValues();
    const supportTicketData = allValues.supportTicketData || {};

    const updatedValues = {};

    if (dirtyFields.supportTicketData?.priority || supportTicketData.priority) {
      updatedValues.priority = supportTicketData.priority;
    }

    if (dirtyFields.supportTicketData?.status || supportTicketData.status) {
      updatedValues.status = supportTicketData.status;
    }

    if (dirtyFields.supportTicketData?.severity || supportTicketData.severity) {
      updatedValues.severity = supportTicketData.severity;
    }
    
    if (dirtyFields.supportTicketData?.reason || supportTicketData.reason) {
      updatedValues.reason = supportTicketData.reason;
    }

    if (dirtyFields.supportTicketData?.source || supportTicketData.source) {
      updatedValues.source = supportTicketData.source;
    }

    if (dirtyFields.supportTicketData?.tags || supportTicketData.tags) {
      updatedValues.tags = supportTicketData.tags;
    }

    if (dirtyFields.supportTicketData?.category || supportTicketData.category) {
      updatedValues.category = supportTicketData.category;
    }




    if (
      dirtyFields.supportTicketData?.description ||
      supportTicketData.description
    ) {
      updatedValues.description = supportTicketData.description;
    }

    if (
      dirtyFields.supportTicketData?.productSKUs?.[0] ||
      supportTicketData.productSKUs?.[0]
    ) {
      updatedValues.productDetails = supportTicketData.productSKUs?.[0];
    }

    if (
      dirtyFields.supportTicketData?.serialNumbers?.[0] ||
      supportTicketData.serialNumbers?.[0]
    ) {
      updatedValues.serialNumber = supportTicketData.serialNumbers?.[0];
    }

    if (
      dirtyFields.supportTicketData?.referenceIdentifiers?.[0] ||
      supportTicketData.referenceIdentifiers?.[0]
    ) {
      updatedValues.referenceIdentifier =
        supportTicketData.referenceIdentifiers?.[0];
    }

    if (
      dirtyFields.supportTicketData?.ownerDetails?.[0]?.ownerName ||
      supportTicketData.ownerDetails?.[0]?.ownerName
    ) {
      updatedValues.ticketOwner =
        supportTicketData.ownerDetails?.[0]?.ownerName;
    }

    if (
      dirtyFields.supportTicketData?.dueDateTime ||
      supportTicketData.dueDateTime
    ) {
      updatedValues.dueDateTime = supportTicketData.dueDateTime;
    }

    return {
      updatedValues,
      isDirty,
      isValid,
      dirtyFieldsCount: Object.keys(updatedValues).length,
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
    }
  }, [getUpdatedValuesWithParams]);
  useEffect(() => {
    if (isDirty) {
      setOpenSupportIssue(true);
    }
  }, [isDirty]);

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
    <div className="flex justify-start ">
      <div className="w-full">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle className="text-lg">Service Details</CardTitle>
          </CardHeader>
          <div className="h-px bg-gray-300  w-full  p-0 " />

          <CardContent className="space-y-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
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
              <FormSelect
                name="supportTicketData.status"
                label="Status"
                placeholder="Status"
                options={statusOptions}
              />
              <FormSelect
                name="supportTicketData.severity"
                label="Severity"
                placeholder="Select severity"
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'High', label: 'High' },
                  { value: 'Critical', label: 'Critical' },
                ]}
              />
              <FormSelect
                name="supportTicketData.reason"
                label="Reason"
                placeholder="Reason"
                options={reasonOptions}
              />
              {/* <FormInput
                name="supportTicketData.ownerDetails.0.ownerName"
                label="Ticket Owner"
                placeholder="Ticket Owner"
              /> */}
              <FormSelect
                name="supportTicketData.source"
                label="Ticket Source"
                placeholder="Ticket source"
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'High', label: 'High' },
                ]}
              />
              <FormSelect
                name="supportTicketData.tags"
                label="Tags"
                placeholder="Select tags"
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'High', label: 'High' },
                ]}
              />

              </div>
              <h3 className='text-bold'>Product Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2  gap-2">


              <FormSelect
                name="supportTicketData.category"
                label="Product Category"
                placeholder="Product category"
                options={categoryOptions}
              />
              <FormInput
                name="supportTicketData.productSKUs.0"
                label="Product Details"
                placeholder="Product details"
              />
              <FormInput
                name="supportTicketData.serialNumbers.0"
                label="Product Serial Number"
                placeholder="Product serial sumber"
              />
              <FormInput
                name="supportTicketData.referenceIdentifiers.0"
                label="Reference order no/Invoice No"
                placeholder="Reference order no/Invoice No"
              />
              {/* <FormSelect
                name="supportTicketData.reason"
                label="Reason"
                placeholder="Reason"
                options={reasonOptions}
              /> */}

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

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">
                  Product Category
                </label>
                <p className="font-medium">
                  {getValues('supportTicketData.category') || '-'}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">
                  Product Details
                </label>
                <p className="font-medium">
                  {getValues('supportTicketData.productSKUs.0') || '-'}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">
                  Asset Serial Number
                </label>
                <p className="font-medium">
                  {getValues('supportTicketData.serialNumbers.0') || '-'}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">
                  Reference Order No / Invoice
                </label>
                <p className="font-medium">
                  {getValues('supportTicketData.referenceIdentifiers.0') || '-'}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">
                  Reason
                </label>
                <p className="font-medium">
                  {getValues('supportTicketData.reason') || '-'}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">
                  Status
                </label>
                <p className="font-medium">
                  {getValues('supportTicketData.status') || '-'}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">
                  Priority
                </label>
                <p className="font-medium">
                  {getValues('supportTicketData.priority') || '-'}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase">
                  Ticket Owner
                </label>
                <p className="font-medium">
                  {getValues('supportTicketData.ownerDetails.0.ownerName') ||
                    '-'}
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase">
                Problem Description
              </label>
              <p className="font-medium whitespace-pre-line">
                {getValues('supportTicketData.description') || '-'}
              </p>
            </div>

            <div>
              <label className="text-muted-foreground text-sm">
                Resolution Due Date
              </label>
              <p className="text-xs lg:text-sm font-medium">
                {getValues('supportTicketData.dueDateTime')
                  ? new Date(
                      getValues('supportTicketData.dueDateTime')
                    ).toLocaleString()
                  : '-'}
              </p>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceIssueDetails;
