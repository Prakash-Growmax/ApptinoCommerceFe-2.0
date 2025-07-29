import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Building, User, Globe, Tag } from 'lucide-react';

import { DetailPageLayout } from '@/components/templates/DetailPageLayout';
import { InfoCard } from '@/components/molecules/InfoCard';
import { InfoGrid } from '@/components/molecules/InfoGrid';
import { ShadCnButton as Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { handleError } from '@/utils/errorHandling';
import { getCompanyDetails } from '../api/company.api';
import { CompanyDetailsType } from '../types/company.type';
import AddressComponent from './address';

import { FormInput, FormSelect } from '@/components/molecules/ReactHookForm';
import { FormSection, FormRow } from '@/components/molecules/FormSection/FormSection';
import { useCustomerAddressStore } from '../store/useCustomerAddressStore';
import { useSubIndustries } from '@/features/settings/hooks/useCompanyOptions';
import { useUpdateCustomerDetails } from '../api/mutation';
import useAppStore from '@/stores/appStore';

const CustomerDetailsPage = (): React.JSX.Element => {
  const { id: customerId } = useParams();
  const [customerDetails, setCustomerDetails] = useState<CompanyDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);




  const methods = useForm<CompanyDetailsType>({
    defaultValues: {
      companyName: '',
      website: '',
      taxId: '',
      businessType: '',
      accountType: '',
      currencyCode: '',
      subIndustryId: '',
      accountOwnerName: '',
      supportOwnerName: '',
      tags: [],
    },
  });

  const { reset, handleSubmit } = methods;
  const { currencyList, customerTagsList } = useCustomerAddressStore();
  const { data: subIndustryOptions = [], isLoading: subIndustryLoading } = useSubIndustries();
  const { payload, accessToken } = useAppStore();
  const updateMutation = useUpdateCustomerDetails();

  useEffect(() => {
    if (!customerId) return;

    const fetchCustomerDetails = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getCompanyDetails({
          companyId: customerId,
          tenantId: payload?.tenantId || '',
          token: accessToken || '',
        });
        setCustomerDetails(data);
        reset(data);
      } catch (err: unknown) {
        const errorMessage = handleError(err, 'fetchCustomerDetails', 'Failed to load customer details');
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerId, reset, payload?.tenantId, accessToken]);

  const onSubmit = async (data: CompanyDetailsType) => {
    if (!customerId) return;

    updateMutation.mutate(
      {
        customerId: Number(customerId),
        data,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setCustomerDetails(prev => prev ? { ...prev, ...data } : data);
        },
        onError: (error) => {
          const errorMessage = handleError(error, 'updateCustomerDetails', 'Failed to update customer details');
          setError(errorMessage);
        },
      }
    );
  };

  const tagOptions = customerTagsList
    ?.flatMap(tagGroup => tagGroup.lsTags || [])
    .map(tag => ({
      label: tag.tagValue,
      value: tag.tagValue,
    })) ?? [];

  const selectedCurrency = customerDetails && currencyList
    ? currencyList.find(c => c.value === customerDetails.currencyCode)
    : null;

  const customerInfoData = customerDetails ? [
    { label: 'Partner Name', value: customerDetails.companyName },
    { label: 'Tax ID', value: customerDetails.taxId },
    { label: 'Business Type', value: customerDetails.businessType },
    { label: 'Sub-Industry', value: customerDetails.subIndustryId?.name || '' },
    { label: 'Account Owner', value: customerDetails.accountOwnerName },
    {
      label: 'Company Tags',
      value: (customerDetails.tags ?? []).map((tag: any) => tag?.tagValue || tag).join(', ')
    },
  ] : [];

  const businessInfoData = customerDetails ? [
    { label: 'Website', value: customerDetails.website, icon: Globe },
    {
      label: 'Currency',
      value: selectedCurrency
        ? `${selectedCurrency.fullData.symbol} (${selectedCurrency.value})`
        : customerDetails.currencyCode,
    },
    { label: 'Account Type', value: customerDetails.accountType },
    { label: 'Industry Description', value: customerDetails.industryDescription },
    { label: 'Support Owner', value: customerDetails.supportOwnerName, icon: User },
  ] : [];

  return (
    <>
      <DetailPageLayout
        title={customerDetails?.companyName || 'Customer Details'}
        breadcrumbs={[
          { label: 'Customers', href: '/customers' },
          { label: customerDetails?.companyName || 'Details' },
        ]}
        actions={
          <Button className="bg-black text-white w-[70px]" size="sm" onClick={() => setIsDialogOpen(true)}>
            Edit
          </Button>
        }
        loading={loading}
        error={error ? new Error(error) : null}
      >
        <InfoCard className="w-[930px]  " title="Customer Information"  icon={Building}>
          <InfoGrid className='' data={customerInfoData} columns={2} gap="md" />
        </InfoCard>

        <InfoCard className="w-[930px]" title="Business Details" icon={Tag}>
          <InfoGrid data={businessInfoData} columns={2} gap="md" />
        </InfoCard>

        <AddressComponent />
      </DetailPageLayout>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open && customerDetails) {
            reset(customerDetails);
          }
        }}
      >
        <DialogContent className="w-[900px] h-[550px] p-5 flex flex-col">
          <DialogHeader>
            <DialogTitle className="mb-3">Edit Customer Details</DialogTitle>
          </DialogHeader>

          <FormProvider {...methods}>
            <div className="overflow-y-auto flex-1 pr-2">
              <form id="customer-edit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormSection>
                  <FormRow columns={1}>
                    <FormInput name="companyName" label="Customer Name" />
                    <FormInput name="website" label="Website" placeholder="https://example.com" />
                    <FormInput name="taxId" label="Tax ID" placeholder="Enter tax ID" />
                    <FormInput name="businessType" label="Business Type" placeholder="e.g., Manufacturer" />
                    <FormInput name="accountType" label="Account Type" placeholder="e.g., Seller" />

                    <FormSelect
                      name="currencyCode"
                      label="Currency"
                      placeholder="Select currency"
                      className="text-gray-700 z-[10000]"
                      options={currencyList}
                    />

                    <FormSelect
                      name="subIndustryId"
                      label="Sub-Industry"
                      placeholder="Select sub-industry"
                      className="z-[9999]"
                      dropdownClassName="z-[9999]"
                      options={subIndustryOptions}
                      disabled={subIndustryLoading}
                    />

                    <FormSelect
                      name="accountOwnerName"
                      label="Account Owner"
                      options={[
                        { label: 'John Doe', value: 'John Doe' },
                        { label: 'Jane Smith', value: 'Jane Smith' },
                      ]}
                    />

                    <FormSelect
                      name="supportOwnerName"
                      label="Support Owner"
                      options={[
                        { label: 'Support A', value: 'Support A' },
                        { label: 'Support B', value: 'Support B' },
                      ]}
                    />

                    <FormSelect
                      name="tags"
                      label="Customer Tags"
                      placeholder="Select customer tags"
                      className="z-[9999]"
                      options={tagOptions}
                    />
                  </FormRow>
                </FormSection>
              </form>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" form="customer-edit-form" disabled={updateMutation.isLoading}>
                {updateMutation.isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerDetailsPage;



