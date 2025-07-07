import React from 'react';
import { DataCard } from '@/components/ui/data-card';
import { ShadCnButton as Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AccountData } from '../types/company.types';
import { PencilIcon } from 'lucide-react';

interface CompanyDetailsViewProps {
  companyData: AccountData | null;
  loading: boolean;
  onEdit: () => void;
}

interface DetailRowProps {
  label: string;
  value: string | undefined;
  loading?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <Skeleton className="h-5 w-32" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm">{value || '-'}</span>
    </div>
  );
};

export const CompanyDetailsView: React.FC<CompanyDetailsViewProps> = ({
  companyData,
  loading,
  onEdit,
}) => {
  return (
    <DataCard
      title="Company Details"
      headerAction={
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          disabled={loading}
        >
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Company Logo and Basic Info */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            {loading ? (
              <Skeleton className="h-32 w-32 rounded-lg" />
            ) : (
              <div className="h-32 w-32 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                {companyData?.logo ? (
                  <img
                    src={companyData.logo}
                    alt={companyData.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">No logo</span>
                )}
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailRow
              label="Company Name"
              value={companyData?.name}
              loading={loading}
            />
            <DetailRow
              label="Website"
              value={companyData?.website}
              loading={loading}
            />
            <DetailRow
              label="Default Email"
              value={companyData?.defaultEmail}
              loading={loading}
            />
            <DetailRow
              label="Company Identifier"
              value={companyData?.companyIdentifier}
              loading={loading}
            />
          </div>
        </div>

        {/* Tax and Business Information */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-semibold mb-4">Tax & Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailRow
              label="Tax ID (PAN)"
              value={companyData?.taxDetailsId?.pan}
              loading={loading}
            />
            <DetailRow
              label="Business Type"
              value={companyData?.businessTypeId?.name}
              loading={loading}
            />
            <DetailRow
              label="Account Type"
              value={companyData?.accountTypeId?.name}
              loading={loading}
            />
          </div>
        </div>

        {/* Financial Information */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-semibold mb-4">Financial Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailRow
              label="Default Currency"
              value={companyData?.currencyId?.currencyCode}
              loading={loading}
            />
            <DetailRow
              label="Currency Symbol"
              value={companyData?.currencyId?.symbol}
              loading={loading}
            />
            <DetailRow
              label="Tax Exempted"
              value={companyData?.taxExempted ? 'Yes' : 'No'}
              loading={loading}
            />
          </div>
        </div>

        {/* Industry Information */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-semibold mb-4">Industry Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailRow
              label="Industry"
              value={companyData?.subIndustryId?.industryId?.name}
              loading={loading}
            />
            <DetailRow
              label="Sub-Industry"
              value={companyData?.subIndustryId?.name}
              loading={loading}
            />
          </div>
          {companyData?.subIndustryId?.description && (
            <div className="mt-4">
              <DetailRow
                label="Industry Description"
                value={companyData.subIndustryId.description}
                loading={loading}
              />
            </div>
          )}
        </div>

        {/* Status Information */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-semibold mb-4">Status Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DetailRow
              label="Account Status"
              value={companyData?.activated ? 'Active' : 'Inactive'}
              loading={loading}
            />
            <DetailRow
              label="Verified"
              value={companyData?.verified ? 'Yes' : 'No'}
              loading={loading}
            />
            <DetailRow
              label="BNPL Enabled"
              value={companyData?.bnplEnabled ? 'Yes' : 'No'}
              loading={loading}
            />
            <DetailRow
              label="Super Seller"
              value={companyData?.superSeller ? 'Yes' : 'No'}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </DataCard>
  );
};