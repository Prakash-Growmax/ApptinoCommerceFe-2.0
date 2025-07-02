import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ColumnDef } from '@tanstack/react-table';

import DashboardTable from '@/components/organisms/DashboardTable/DashboardTable';
import { TableCellText } from '@/components/ui/table-typography';
import useSideBarStore from '@/stores/sidebarStore';

import SupportFilters from '../components/SupportFilters';
import { useGetSupportTicketFilters } from '../hook/useGetSupportTicketFilter';
import useSupportStore from '../store/useSupportStore';

export default function SupportLanding() {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  useGetSupportTicketFilters();
  const {
    supportData,
    page,
    setPage,
    rowPerPage,
    setRowPerPage,
    totalCount,
    loading,
  } = useSupportStore();

  const { sideOpen } = useSideBarStore();

  const handleRowClick = (row: any) => {
    navigate(`/supporttickets/servicedetails/${row?.ticketIdentifier}`);
  };

  const handlePrevious = () => {
    setPage(prev => prev - 1);
  };

  const handleNext = () => {
    setPage(prev => prev + 1);
  };

  const Columns: ColumnDef<any>[] = [
    {
      accessorKey: 'ticketIdentifier',
      header: 'Ticket Id',
      cell: ({ row }) => (
        <TableCellText variant="primary">
          {row.original?.ticketIdentifier || '--'}
        </TableCellText>
      ),
    },
    {
      accessorKey: 'buyerCompanyName',
      header: 'Company',
      cell: ({ row }) => (
        <TableCellText variant="primary">
          {row.original?.buyerCompanyName || '--'}
        </TableCellText>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Subject',
      cell: ({ row }) => (
        <TableCellText variant="primary">
          {row.original?.title || '--'}
        </TableCellText>
      ),
    },
    
    {
      accessorKey: 'createdDateTime',
      header: 'Created',
      cell: ({ row }) => {
        const dateStr = row?.original?.createdDateTime;
        const formattedDate = dateStr
          ? new Date(dateStr).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })
          : '--';

        return <TableCellText variant="primary">{formattedDate}</TableCellText>;
      },
    },
    {
      accessorKey: 'dueDateTime',
      header: 'Due On',
      cell: ({ row }) => {
        const dueDateStr = row?.original?.dueDateTime;
        const formattedDueDate = dueDateStr
          ? new Date(dueDateStr).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })
          : '--';

        return (
          <TableCellText variant="primary">{formattedDueDate}</TableCellText>
        );
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <TableCellText variant="primary">
          {row.original?.category || '--'}
        </TableCellText>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        switch (row?.original?.status) {
          case 'Open':
          case 'OPEN':
            return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#FBC02D] text-[#FBC02D]">
                {row?.original?.status}
              </span>
            );
          case 'Inprogress':
          case 'INPROGRESS':
          case 'IN PROGRESS':
            return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#F57C00] text-[#F57C00]">
                {row?.original?.status}
              </span>
            );
          case 'Completed':
          case 'COMPLETED':
            return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#4caf50] text-[#4caf50]">
                {row?.original?.status}
              </span>
            );
          case 'Waiting For Customer':
          case 'WAITING FOR CUSTOMER':
            return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-primary text-primary">
                {row?.original?.status}
              </span>
            );
          default:
            return (
              <span className="text-xs font-medium">
                {row?.original?.status}
              </span>
            );
        }
      },
    },
    
    {
      accessorKey: 'buyerContactPerson',
      header: 'Contact',
      cell: ({ row }) => (
        <TableCellText variant="primary">
          {row.original?.buyerContactPerson || '--'}
        </TableCellText>
      ),
    },
    {
      id: 'buyerEmail',
      header: 'Contact Info',
      cell: ({ row }) => {
        const email = row?.original?.buyerEmail;
        const phone = row?.original?.buyerContactNumber;
        return (
          <TableCellText variant="primary">
            <div className="truncate max-w-32 sm:max-w-none">
              {email || '--'}
            </div>
            <div>{phone || '--'}</div>
          </TableCellText>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => (
        <TableCellText variant="primary">
          {row?.original?.priority || '--'}
        </TableCellText>
      ),
    },
  ];

  return (
    <div
      className={`flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 transition-all duration-300 w-full bg-[#E5E5E5] ml-3  ${
        sideOpen
          ? 'lg:max-w-[calc(100vw-20rem)]'
          : 'lg:max-w-[calc(100vw-5rem)]'
      }`}
    >
      <SupportFilters />
      <div className="w-[76rem] overflow-hidden bg-white rounded-md ">
        <DashboardTable
          data={supportData}
          columns={Columns}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
          totalDataCount={totalCount}
          setPage={setPage}
          pageOptions={[10, 20, 50, 100]}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          page={page}
          rowPerPage={rowPerPage}
          setRowPerPage={setRowPerPage}
          onRowClick={handleRowClick}
          tableHeight={`${sideOpen ? 'h-[calc(100vh-180px)]' : 'h-[calc(100vh-180px)]'} sm:h-[calc(105vh-200px)] bg-white`}
        />
      </div>
    </div>
  );
}
