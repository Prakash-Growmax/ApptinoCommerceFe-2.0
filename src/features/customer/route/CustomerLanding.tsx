import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';

import { PageHeader } from '@/components/templates/PageLayout/PageLayout';
import DashboardTable from '@/components/organisms/DashboardTable/DashboardTable';
import { DataCard } from '@/components/ui/data-card';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TYPOGRAPHY } from '@/lib/design-system/constants';
import { cn } from '@/lib/utils';
import { ShadCnButton as Button } from '@/components/ui/button';
import useAccountsStore from '@/stores/useAccountStore';
import { useFetchCustomersWithFilters } from '../hook/useGetCustomersDetails';
import CreateCustomer from './CreateCustomer';
import CustomerFilter from './CustomerFilter';

const CustomerLanding = () => {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const {
    data,
    loading,
    page,
    setPage,
    rowPerPage,
    setRowPerPage,
    totalCount,
  } = useAccountsStore();
  
  useFetchCustomersWithFilters();

  const columns: ColumnDef<any>[] = useMemo(() => [
    {
      id: 'companyName',
      accessorKey: 'companyName',
      header: 'Company Name',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className={cn(TYPOGRAPHY.bodySmall, "font-medium")}>
            {value || <span className={TYPOGRAPHY.caption}>-</span>}
          </div>
        );
      },
    },
    {
      id: 'city',
      accessorKey: 'city',
      header: 'City',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className={TYPOGRAPHY.bodySmall}>
            {value || <span className={TYPOGRAPHY.caption}>-</span>}
          </div>
        );
      },
    },
    {
      id: 'state',
      accessorKey: 'state',
      header: 'State',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className={TYPOGRAPHY.bodySmall}>
            {value || <span className={TYPOGRAPHY.caption}>-</span>}
          </div>
        );
      },
    },
    {
      id: 'subIndustry',
      accessorKey: 'subIndustry',
      header: 'Industry Type',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className={TYPOGRAPHY.bodySmall}>
            {value || <span className={TYPOGRAPHY.caption}>-</span>}
          </div>
        );
      },
    },
    {
      id: 'erp_Code',
      accessorKey: 'erp_Code',
      header: 'ERP Code',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <div className={cn(TYPOGRAPHY.bodySmall, "font-mono")}>
            {value || <span className={TYPOGRAPHY.caption}>-</span>}
          </div>
        );
      },
    },
    {
      id: 'isActivated',
      accessorKey: 'isActivated',
      header: 'Status',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <StatusBadge 
            variant={value === 1 ? 'success' : 'destructive'}
          >
            {value === 1 ? 'Active' : 'Inactive'}
          </StatusBadge>
        );
      },
    },
    {
      id: 'accountOwner',
      accessorKey: 'accountOwner',
      header: 'Account Owner',
      cell: ({ getValue }) => {
        const value = getValue() as string[] | undefined;
        
        if (!value || value.length === 0) {
          return <span className={TYPOGRAPHY.caption}>-</span>;
        }

        return (
          <div className="flex items-center gap-1.5">
            <StatusBadge variant="secondary">
              {value[0]}
            </StatusBadge>
            {value.length > 1 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className={cn(TYPOGRAPHY.caption, "cursor-help")}>
                      +{value.length - 1}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      {value.slice(1).map((owner: string, idx: number) => (
                        <div key={idx} className={TYPOGRAPHY.caption}>
                          {owner}
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
  ], []);

  const handleRowClick = useCallback((row: any) => {
    navigate(`/customers/customerdetails/${row?.companyID}`);
  }, [navigate]);
  
  const handlePrevious = useCallback(() => {
    setPage(prev => prev - 1);
  }, [setPage]);

  const handleNext = useCallback(() => {
    setPage(prev => prev + 1);
  }, [setPage]);

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 sm:p-6 pb-2 sm:pb-4">
        <PageHeader 
          title="Customers" 
          subtitle="Manage your customer accounts and relationships"
          action={
            <Button onClick={() => setCreateOpen(true)}>
              Create Customer
            </Button>
          }
        />
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="w-full">
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="border-b border-border">
              <CustomerFilter />
            </div>
            <DashboardTable
            data={data}
            columns={columns}
            loading={loading}
            pagination={pagination}
            setPagination={setPagination}
            totalDataCount={totalCount}
            pageOptions={[10, 20, 50]}
            page={page}
            setPage={setPage}
            rowPerPage={rowPerPage || 20}
            setRowPerPage={setRowPerPage}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
      <CreateCustomer open={createOpen} setOpen={setCreateOpen} />
    </div>
  );
};

export default CustomerLanding;