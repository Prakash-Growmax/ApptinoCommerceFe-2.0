import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DataCard } from '@/components/ui/data-card';
import { ShadCnButton as Button } from '@/components/ui/button';
import { FormInput, FormSelect } from '@/components/molecules/ReactHookForm';
import { FormSection, FormRow } from '@/components/molecules/FormSection/FormSection';
import { AccountData } from '../types/company.types';
import { companyDetailsFormSchema, CompanyDetailsFormData } from '../schema/company.schema';
import { useCompanyOptions } from '../hooks/useCompanyOptions';
import { Loader2 } from 'lucide-react';



import { useSubIndustries } from '../hooks/useCompanyOptions';


interface CompanyDetailsEditProps {
  companyData: AccountData | null;
  onSave: (data: CompanyDetailsFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export const CompanyDetailsEdit: React.FC<CompanyDetailsEditProps> = ({
  companyData,
  onSave,
  onCancel,
  isSaving = false,
}) => {
  const methods = useForm<CompanyDetailsFormData>({
    resolver: zodResolver(companyDetailsFormSchema),
    defaultValues: {
      name: '',
      website: '',
      taxId: '',
      businessTypeId: '',
      accountTypeId: '',
      currencyId: '',
      subIndustryId: '',
      defaultEmail: '',
      logo: '',
    },
  });


  const { data: subIndustryOptions = [], isLoading: subIndustryLoading } = useSubIndustries();


  useEffect(() => {
    if (companyData) {
      methods.reset({
        name: companyData.name || '',
        website: companyData.website || '',
        taxId: companyData.taxDetailsId?.pan || '',
        businessTypeId: companyData.businessTypeId?.name || '',
        accountTypeId: companyData.accountTypeId?.name || '',
        currencyId: companyData.currencyId?.currencyCode || '',
        subIndustryId: companyData.subIndustryId?.id?.toString() || '',

        defaultEmail: companyData.defaultEmail || '',
        logo: companyData.logo || '',
      });
    }
  }, [companyData, methods]);

  const handleSubmit = methods.handleSubmit((data) => {
    onSave(data);
  });


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <DataCard
          title="Edit Company Details"
          footer={
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Basic Information */}
            <FormSection title="Basic Information" description="Update your company's basic details">
              <FormRow columns={2}>
                <FormInput
                  name="name"
                  label="Company Name"
                  placeholder="Enter company name"
                  required
                />
                <FormInput
                  name="website"
                  label="Website"
                  placeholder="https://example.com"
                  type="url"
                />
              </FormRow>
              <FormRow columns={2}>
                <FormInput
                  name="defaultEmail"
                  label="Default Email"
                  placeholder="contact@example.com"
                  type="email"
                />
                <FormInput
                  name="logo"
                  label="Logo URL"
                  placeholder="https://example.com/logo.png"
                />
              </FormRow>
            </FormSection>

            {/* Tax and Business Information */}
            <FormSection title="Tax & Business Information" description="Configure tax and business settings">
              <FormRow columns={2}>
                <FormInput
                  name="taxId"
                  label="Tax ID (PAN)"
                  placeholder="Enter tax ID"
                // required
                />
                <FormInput
                  name="businessTypeId"
                  label="Business Type"
                  placeholder="Select business type"
                
                />
              </FormRow>
              <FormRow columns={2}>
                <FormInput
                  name="accountTypeId"
                  label="Account Type"
                  placeholder="Select account type"
               
                />

                <FormInput
                  name="currencyId"
                  label="Default Currency"
                  placeholder="Select currency"
                
                />
              </FormRow>
            </FormSection>

            {/* Industry Information */}
            <FormSection title="Industry Information" description="Select your industry classification">
              <FormRow columns={1}>
                <FormSelect
                  name="subIndustryId"
                  label="Sub-Industry"
                  placeholder="Select sub-industry"
                  options={subIndustryOptions}
                  disabled={subIndustryLoading}
                />
              </FormRow>
            </FormSection>
          </div>
        </DataCard>
      </form>
    </FormProvider>
  );
};






