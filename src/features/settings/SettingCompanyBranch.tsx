import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DashboardTable from '@/components/organisms/DashboardTable/DashboardTable';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DataCard } from '@/components/ui/data-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { TYPOGRAPHY } from '@/lib/design-system/constants';
import { cn } from '@/lib/utils';
import { useGetBranchDetails } from './hooks/useGetBranchDetails';
import useCompanyBranchStore from './store/useCompanyBranchStore';

const SettingCompanyBranch = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const { page, setPage, rowPerPage, setRowPerPage, searchString } = useCompanyBranchStore();
  
  // Use the hook and get data from TanStack Query
  const { data, isLoading } = useGetBranchDetails({ searchString });
  
  // Extract data from the query response
  const branchData = data?.data?.branchResponse || [];
  const totalCount = data?.data?.totalCount || 0;

  const getCustomLabel = (key: string, address: any) =>
    address?.labels?.[key] || null;
  const getIsHidden = (key: string, address: any) =>
    address?.hidden?.includes(key);
  const getGST = (address: any) => address?.gst || null;
  // Removed unused formatAddress function

  // Replace with props/state if dynamic
  const address = {};
  const seller = true;
  const Columns: ColumnDef<any>[] = [
    {
      accessorKey: 'branchName',
      header: () => getCustomLabel('branchName', address) || 'Branch Name',
      cell: ({ row }) => (
        <div className={cn(TYPOGRAPHY.bodySmall, "font-medium")}>
          {row.original?.addressId?.branchName || '-'}
        </div>
      ),
      enableHiding: !getIsHidden('branchName', address),
    },
    {
      id: 'addressData',
      header: 'Address',
      cell: ({ row }) => {
        const address = row?.original?.addressId;

        if (!address) return <span className={TYPOGRAPHY.caption}>-</span>;

        return (
          <div className={cn(TYPOGRAPHY.bodySmall, "space-y-0.5")}>
            {address.city && <div>{address.city}</div>}
            {address.state && <div>{address.state}</div>}
            {address.pinCodeId && <div>{address.pinCodeId}</div>}
            {address.country && <div>{address.country}</div>}
          </div>
        );
      },
    },
    {
      accessorKey: 'gst',
      header: () => getCustomLabel('gst', address) || 'Tax ID',
      enableHiding: !getIsHidden('gst', address),
      cell: ({ row }) => (
        <div className={TYPOGRAPHY.bodySmall}>
          {getGST(row.original?.addressId) || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'addressId.primaryContact',
      header: () => getCustomLabel('primaryContact', address) || 'Contact',
      enableHiding: !getIsHidden('primaryContact', address),
      cell: ({ row }) => (
        <div className={TYPOGRAPHY.bodySmall}>
          {row.original?.addressId?.primaryContact || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'addressId.mobileNo',
      header: () => getCustomLabel('mobileNo', address) || 'Phone',
      enableHiding: !getIsHidden('mobileNo', address),
      cell: ({ row }) => {
        const mobile = row.original?.addressId?.mobileNo;
        const countryCode = row.original?.addressId?.countryCode || '+91';
        return (
          <div className={cn(TYPOGRAPHY.bodySmall, "whitespace-nowrap")}>
            {mobile || '-'}
          </div>
        );
      },
    },
    {
      id: 'businessUnit',
      header: 'Business Unit',
      enableHiding: !seller,
      cell: ({ row }) => {
        const units = row.original?.businessUnits || [];
        if (!units.length) return <span className={TYPOGRAPHY.caption}>-</span>;
        
        return (
          <div className="flex items-center gap-1.5">
            <StatusBadge variant="secondary">
              {units[0].unitName}
            </StatusBadge>
            {units.length > 1 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className={cn(TYPOGRAPHY.caption, "cursor-help")}>
                      +{units.length - 1}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      {units.slice(1).map((u: any, i: number) => (
                        <div key={i} className={TYPOGRAPHY.caption}>
                          {u.unitName}
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      },
    },
    {
      id: 'wareHouses',
      header: 'Assigned Warehouse',
      enableHiding: !seller,
      cell: ({ row }) => {
        const wh = row.original?.wareHouses || [];
        if (!wh.length) return <span className={TYPOGRAPHY.caption}>-</span>;
        
        return (
          <div className="flex items-center gap-1.5">
            <StatusBadge variant="secondary">
              {wh[0].wareHouseName}
            </StatusBadge>
            {wh.length > 1 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className={cn(TYPOGRAPHY.caption, "cursor-help")}>
                      +{wh.length - 1}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      {wh.slice(1).map((w: any, i: number) => (
                        <div key={i} className={TYPOGRAPHY.caption}>
                          {w.wareHouseName}
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      },
    },
    {
      id: 'addressFor',
      header: 'Type',
      cell: ({ row }) => {
        const addr = row.original?.addressId;
        if (!addr) return null;
        
        const types = [];
        if (addr.regAddress) types.push('Registered');
        if (addr.isBilling) types.push('Billing');
        if (addr.isShipping) types.push('Shipping');
        
        if (!types.length) return <span className={TYPOGRAPHY.caption}>-</span>;
        
        return (
          <div className="flex flex-col gap-1">
            {types.map((type) => (
              <StatusBadge key={type} variant="outline">
                {type}
              </StatusBadge>
            ))}
          </div>
        );
      },
    },
  ];
  const handlePrevious = () => {
    setPage(prev => prev - 1);
  };

  const handleNext = () => {
    setPage(prev => prev + 1);
  };
  return (
    <DataCard 
      title="Company Branches"
      description="Manage your company branch locations and details"
      className="w-full overflow-hidden"
      noPadding
    >
      <DashboardTable
        data={branchData}
        columns={Columns}
        loading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        totalDataCount={totalCount}
        setPage={setPage}
        pageOptions={[5, 10, 20]}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        page={page}
        rowPerPage={rowPerPage || 20}
        setRowPerPage={setRowPerPage}
      />
    </DataCard>
  );
};
export default SettingCompanyBranch;