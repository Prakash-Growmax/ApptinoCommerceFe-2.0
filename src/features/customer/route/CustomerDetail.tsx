import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Building, User, Globe, Tag } from 'lucide-react';

import { DetailPageLayout } from '@/components/templates/DetailPageLayout';
import { InfoCard } from '@/components/molecules/InfoCard';
import { InfoGrid } from '@/components/molecules/InfoGrid';
import { ShadCnButton as Button } from '@/components/ui/button';
import { handleError } from '@/utils/errorHandling';

import { getCompanyDetails } from '../api/company.api';
import { CompanyDetailsType } from '../types/company.type';
import AddressComponent from './address';

const CompanyDetailsPage = (): React.JSX.Element => {
  const { id: companyId } = useParams();
  const [companyDetails, setCompanyDetails] =
    useState<CompanyDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen] = useState(false);
  const { reset } = useForm<FormData>();

  const tenantId = 'dev3';
  const token = 'your_jwt_token_here';

  useEffect(() => {
    if (!companyId) return;

    const fetchCompanyDetails = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getCompanyDetails({ companyId, tenantId, token });
        setCompanyDetails(data);
      } catch (err: unknown) {
        const errorMessage = handleError(
          err,
          'fetchCompanyDetails',
          'Failed to load company details'
        );
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  useEffect(() => {
    if (!isDialogOpen) {
      reset();
    }
  }, [isDialogOpen, reset]);

  const companyInfoData = companyDetails ? [
    { label: 'Partner Name', value: companyDetails.companyName },
    { label: 'Tax ID', value: companyDetails.taxId },
    { label: 'Business Type', value: companyDetails.businessType },
    { label: 'SubIndustry', value: companyDetails.subIndustry },
    { label: 'Account Owner', value: companyDetails.accountOwnerName },
    { label: 'Company Tags', value: companyDetails.tags },
  ] : [];

  const businessInfoData = companyDetails ? [
    { label: 'Website', value: companyDetails.website, icon: Globe },
    { label: 'Currency', value: companyDetails.currencyCode },
    { label: 'Account Type', value: companyDetails.accountType },
    { label: 'Industry Description', value: companyDetails.industryDescription },
    { label: 'Support Owner', value: companyDetails.supportOwnerName, icon: User },
  ] : [];

  return (
    <DetailPageLayout
      title={companyDetails?.companyName || 'Company Details'}
      breadcrumbs={[
        { label: 'Customers', href: '/customers' },
        { label: companyDetails?.companyName || 'Details' }
      ]}
      actions={
        <Button size="sm" variant="outline">
          Edit
        </Button>
      }
      loading={loading}
      error={error ? new Error(error) : null}
    >
      <InfoCard 
        title="Company Information" 
        icon={Building}
        collapsible={true}
        defaultCollapsed={false}
      >
        <InfoGrid 
          data={companyInfoData}
          columns={2}
          gap="md"
        />
      </InfoCard>

      <InfoCard 
        title="Business Details" 
        icon={Tag}
        collapsible={true}
        defaultCollapsed={false}
      >
        <InfoGrid 
          data={businessInfoData}
          columns={2}
          gap="md"
        />
      </InfoCard>

      {/* Address Section */}
      <AddressComponent />
    </DetailPageLayout>
  );
};

export default CompanyDetailsPage;
