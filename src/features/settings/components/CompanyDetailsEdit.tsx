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
      businessTypeId: 0,
      accountTypeId: 0,
      currencyId: 0,
      subIndustryId: 0,
      defaultEmail: '',
      logo: '',
    },
  });

  const { data: options, isLoading: optionsLoading } = useCompanyOptions();

  useEffect(() => {
    if (companyData) {
      methods.reset({
        name: companyData.name || '',
        website: companyData.website || '',
        taxId: companyData.taxDetailsId?.pan || '',
        businessTypeId: companyData.businessTypeId?.id || 0,
        accountTypeId: companyData.accountTypeId?.id || 0,
        currencyId: companyData.currencyId?.id || 0,
        subIndustryId: companyData.subIndustryId?.id || 0,
        defaultEmail: companyData.defaultEmail || '',
        logo: companyData.logo || '',
      });
    }
  }, [companyData, methods]);

  const handleSubmit = methods.handleSubmit((data) => {
    onSave(data);
  });

  // Use fetched options if available, otherwise fallback to current values
  const businessTypeOptions = options?.businessTypes?.length > 0 
    ? options.businessTypes 
    : companyData?.businessTypeId 
      ? [{ value: companyData.businessTypeId.id.toString(), label: companyData.businessTypeId.name }]
      : [];

  const accountTypeOptions = options?.accountTypes?.length > 0
    ? options.accountTypes
    : companyData?.accountTypeId
      ? [{ value: companyData.accountTypeId.id.toString(), label: companyData.accountTypeId.name }]
      : [];

  const currencyOptions = options?.currencies?.length > 0
    ? options.currencies
    : companyData?.currencyId
      ? [{ value: companyData.currencyId.id.toString(), label: companyData.currencyId.currencyCode }]
      : [];

  const subIndustryOptions = options?.subIndustries?.length > 0
    ? options.subIndustries
    : companyData?.subIndustryId
      ? [{ value: companyData.subIndustryId.id.toString(), label: companyData.subIndustryId.name }]
      : [];

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
                <FormSelect
                  name="businessTypeId"
                  label="Business Type"
                  placeholder="Select business type"
                  options={businessTypeOptions}
                  required
                  disabled={optionsLoading}
                />
              </FormRow>
              <FormRow columns={2}>
                <FormSelect
                  name="accountTypeId"
                  label="Account Type"
                  placeholder="Select account type"
                  options={accountTypeOptions}
                  required
                  disabled={optionsLoading}
                />
                <FormSelect
                  name="currencyId"
                  label="Default Currency"
                  placeholder="Select currency"
                  options={currencyOptions}
                  required
                  disabled={optionsLoading}
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
                  required
                  disabled={optionsLoading}
                />
              </FormRow>
            </FormSection>
          </div>
        </DataCard>
      </form>
    </FormProvider>
  );
};






// import React, { useEffect } from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { DataCard } from '@/components/ui/data-card';
// import { ShadCnButton as Button } from '@/components/ui/button';
// import { FormInput, FormSelect } from '@/components/molecules/ReactHookForm';
// import { FormSection, FormRow } from '@/components/molecules/FormSection/FormSection';
// import { AccountData } from '../types/company.types';
// import { companyDetailsFormSchema, CompanyDetailsFormData } from '../schema/company.schema';
// import { useCompanyOptions } from '../hooks/useCompanyOptions';
// import { Loader2 } from 'lucide-react';

// interface CompanyDetailsEditProps {
//   companyData: AccountData | null;
//   onSave: (data: CompanyDetailsFormData) => void;
//   onCancel: () => void;
//   isSaving?: boolean;
// }

// export const CompanyDetailsEdit: React.FC<CompanyDetailsEditProps> = ({
//   companyData,
//   onSave,
//   onCancel,
//   isSaving = false,
// }) => {
//   const methods = useForm<CompanyDetailsFormData>({
//     resolver: zodResolver(companyDetailsFormSchema),
//     defaultValues: {
//       name: '',
//       website: '',
//       taxId: '',
//       businessTypeId: 0,
//       accountTypeId: 0,
//       currencyId: 0,
//       subIndustryId: 0,
//       defaultEmail: '',
//       logo: '',
//     },
//   });

//   const {
//     data: subIndustryData,
//     refetch: fetchSubIndustries,
//     isFetching: subIndustryLoading,
//   } = useCompanyOptions();

//   useEffect(() => {
//     if (companyData) {
//       methods.reset({
//         name: companyData.name || '',
//         website: companyData.website || '',
//         taxId: companyData.taxDetailsId?.pan || '',
//         businessTypeId: companyData.businessTypeId?.id || 0,
//         accountTypeId: companyData.accountTypeId?.id || 0,
//         currencyId: companyData.currencyId?.id || 0,
//         subIndustryId: companyData.subIndustryId?.id || 0,
//         defaultEmail: companyData.defaultEmail || '',
//         logo: companyData.logo || '',
//       });
//     }
//   }, [companyData, methods]);

//   const handleSubmit = methods.handleSubmit((data) => {
//     onSave(data);
//   });

//   const subIndustryOptions =
//     subIndustryData?.length > 0
//       ? subIndustryData
//       : companyData?.subIndustryId
//         ? [{ value: companyData.subIndustryId.id.toString(), label: companyData.subIndustryId.name }]
//         : [];

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit}>
//         <DataCard
//           title="Edit Company Details"
//           footer={
//             <div className="flex justify-end gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onCancel}
//                 disabled={isSaving}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isSaving}>
//                 {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 Save Changes
//               </Button>
//             </div>
//           }
//         >
//           <div className="space-y-6">
//             {/* Basic Information */}
//             <FormSection title="Basic Information" description="Update your company's basic details">
//               <FormRow columns={2}>
//                 <FormInput
//                   name="name"
//                   label="Company Name"
//                   placeholder="Enter company name"
//                   required
//                 />
//                 <FormInput
//                   name="website"
//                   label="Website"
//                   placeholder="https://example.com"
//                   type="url"
//                 />
//               </FormRow>
//               <FormRow columns={2}>
//                 <FormInput
//                   name="defaultEmail"
//                   label="Default Email"
//                   placeholder="contact@example.com"
//                   type="email"
//                 />
//                 <FormInput
//                   name="logo"
//                   label="Logo URL"
//                   placeholder="https://example.com/logo.png"
//                 />
//               </FormRow>
//             </FormSection>

//             {/* Tax and Business Information */}
//             <FormSection title="Tax & Business Information" description="Configure tax and business settings">
//               <FormRow columns={2}>
//                 <FormInput
//                   name="taxId"
//                   label="Tax ID (PAN)"
//                   placeholder="Enter tax ID"
//                 />
//                 <FormSelect
//                   name="businessTypeId"
//                   label="Business Type"
//                   placeholder="Select business type"
//                   options={[]} // TODO: implement later
//                   required
//                   disabled
//                 />
//               </FormRow>
//               <FormRow columns={2}>
//                 <FormSelect
//                   name="accountTypeId"
//                   label="Account Type"
//                   placeholder="Select account type"
//                   options={[]} // TODO: implement later
//                   required
//                   disabled
//                 />
//                 <FormSelect
//                   name="currencyId"
//                   label="Default Currency"
//                   placeholder="Select currency"
//                   options={[]} // TODO: implement later
//                   required
//                   disabled
//                 />
//               </FormRow>
//             </FormSection>

//             {/* Industry Information */}
//             <FormSection title="Industry Information" description="Select your industry classification">
//               <FormRow columns={1}>
//                 <FormSelect
//                   name="subIndustryId"
//                   label="Sub-Industry"
//                   placeholder="Select sub-industry"
//                   options={subIndustryOptions}
//                   required
//                   disabled={subIndustryLoading}
//                   onFocus={() => {
//                     if (!subIndustryData || subIndustryData.length === 0) {
//                       fetchSubIndustries();
//                     }
//                   }}
//                 />
//               </FormRow>
//             </FormSection>
//           </div>
//         </DataCard>
//       </form>
//     </FormProvider>
//   );
// };

