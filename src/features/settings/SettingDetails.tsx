import { useState } from "react";
import { useGetCompanyDetails } from "./hooks/useGetCompanyDetails";
import useSideBarStore from "@/stores/sidebarStore";
import { CompanyDetailsView } from "./components/CompanyDetailsView";
import { CompanyDetailsEdit } from "./components/CompanyDetailsEdit";
import { useUpdateCompanyDetails } from "./api/mutations";
import { CompanyDetailsFormData, UpdateCompanyRequest } from "./schema/company.schema";
import { AccountData } from "./types/company.types";

const SettingDetails = () => {
  const { data, isLoading } = useGetCompanyDetails();
  const { sideOpen } = useSideBarStore();
  const [isEditMode, setIsEditMode] = useState(false);
  
  const updateCompanyMutation = useUpdateCompanyDetails();
  
  // Extract company data from the query response
  const companyData = data?.data || null;

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleSave = async (formData: CompanyDetailsFormData) => {
    if (!companyData || !companyData.id) {
      return;
    }

    // Transform form data to match API structure
    const updateData: UpdateCompanyRequest = {
      id: companyData.id,
      name: formData.name,
      website: formData.website,
      taxDetailsId: {
        id: companyData.taxDetailsId?.id || 0,
        pan: formData.taxId,
      },
      businessTypeId: {
        id: formData.businessTypeId,
      },
      accountTypeId: {
        id: formData.accountTypeId,
      },
      currencyId: {
        id: formData.currencyId,
      },
      subIndustryId: {
        id: formData.subIndustryId,
      },
      defaultEmail: formData.defaultEmail,
      logo: formData.logo,
    };

    try {
      await updateCompanyMutation.mutateAsync({
        companyId: companyData.id,
        data: updateData,
      });
      setIsEditMode(false);
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to update company details:', error);
    }
  };

  const containerClassName = `w-full ${
    sideOpen ? 'lg:max-w-[calc(100vw-20rem)]' : 'lg:max-w-[calc(100vw-5rem)]'
  }`;

  return (
    <div className={containerClassName}>
      {isEditMode ? (
        <CompanyDetailsEdit
          companyData={companyData}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={updateCompanyMutation.isPending}
        />
      ) : (
        <CompanyDetailsView
          companyData={companyData}
          loading={isLoading}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default SettingDetails;