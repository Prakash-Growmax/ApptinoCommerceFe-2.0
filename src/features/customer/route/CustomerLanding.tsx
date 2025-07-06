import { useState, useMemo, useCallback } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from 'lucide-react';

import DashboardTable from '@/components/organisms/DashboardTable/DashboardTable';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useSideBarStore from '@/stores/sidebarStore';
import useAccountsStore from '@/stores/useAccountStore';

import { useFetchCustomersWithFilters } from '../hook/useGetCustomersDetails';
import { useNavigate } from 'react-router-dom';

const CustomerLanding = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, // You can change this as needed
  });
const navigate = useNavigate();
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
    },
    {
      id: 'city',
      accessorKey: 'city',
      header: 'City',
      cell: ({ getValue }) => {
        const value = getValue();
        return <span className="text-foreground">{value || '_'}</span>;
      },
    },
    {
      id: 'state',
      accessorKey: 'state',
      header: 'State',
      cell: ({ getValue }) => {
        const value = getValue();
        return <span className="text-foreground">{value || '_'}</span>;
      },
    },
    {
      id: 'subIndustry',
      accessorKey: 'subIndustry',
      header: 'Industry Type',
      cell: ({ getValue }) => {
        const value = getValue();
        return <span className="text-foreground">{value || '_'}</span>;
      },
    },
    {
      id: 'erp_Code',
      accessorKey: 'erp_Code',
      header: 'ERP Code',
      cell: ({ getValue }) => {
        const value = getValue();
        return <span className="text-foreground">{value || '_'}</span>;
      },
    },
    {
      id: 'isActivated',
      accessorKey: 'isActivated',
      header: 'Status',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-md ${
              value === 1
                ? 'bg-success/10 text-success'
                : 'bg-destructive/10 text-destructive'
            }`}
          >
            {value === 1 ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      id: 'accountOwner',
      accessorKey: 'accountOwner',
      header: 'Account Owner',
      cell: ({ getValue }) => {
        const value = getValue();

        return (
          <div className="flex items-center space-x-2 ">
            {value[0] ? (
              <Badge variant="outline" className="text-sm px-2 py-1">
                {value[0]}
              </Badge>
            ) : (
              <span>-</span>
            )}

            {value.length > 1 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm text-muted-foreground cursor-pointer">
                    +{value.length - 1}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="p-2">
                  <div className="flex flex-col space-y-1">
                    {value.slice(1).map((owner, idx) => (
                      <span key={idx} className="text-sm">
                        {owner}
                      </span>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ], []);

  // const paginatedData = data.slice(
  //   pagination.pageIndex * pagination.pageSize,
  //   (pagination.pageIndex + 1) * pagination.pageSize
  // );
    const handleRowClick = useCallback((row: any) => {
      console.log(row);
    navigate(`/customers/customerdetails/${row?.companyID}`);
  }, [navigate]);
  
  const handlePrevious = useCallback(() => {
    setPage(prev => prev - 1);
  }, [setPage]);

  const handleNext = useCallback(() => {
    setPage(prev => prev + 1);
  }, [setPage]);
  const { sideOpen } = useSideBarStore();
  return (
    <div className="w-[76rem] ml-4">
      <DashboardTable
        data={data}
        columns={columns}
        loading={loading}
        pagination={pagination}
        setPagination={setPagination}
        totalDataCount={totalCount}
        pageOptions={[5, 10, 20]}
        page={page}
        setPage={setPage}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        tableHeight="h-[calc(100vh-180px)] sm:h-[calc(106vh-200px)]"
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default CustomerLanding;
