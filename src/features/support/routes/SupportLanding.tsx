import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ColumnDef } from '@tanstack/react-table';

import DashboardTable from '@/components/organisms/DashboardTable/DashboardTable';
import useSideBarStore from '@/stores/sidebarStore';

import SupportTickets from '../SupportTickets';
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
  console.log('Adfas');

  const Columns: ColumnDef<any>[] = [
    {
      accessorKey: 'title',
      header: 'Subject',
      cell: ({ row }) => (
        <div className="text-sm font-medium">{row.original?.title}</div>
      ),
    },
    {
      accessorKey: 'ticketIdentifier',
      header: 'Ticket Id',
      cell: ({ row }) => (
        <div className="text-sm font-medium">
          {row.original?.ticketIdentifier}
        </div>
      ),
    },
    {
      accessorKey: 'createdDateTime',
      header: 'Created Date',
      cell: ({ row }) => {
        const dateStr = row?.original?.createdDateTime;
        const formattedDate = dateStr
          ? new Date(dateStr).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })
          : '--';

        return <div className="text-sm font-medium">{formattedDate}</div>;
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

        return <div className="text-sm font-medium">{formattedDueDate}</div>;
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div className="text-sm font-medium">{row.original?.category}</div>
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
      accessorKey: 'buyerCompanyName',
      header: 'Company Name',
      cell: ({ row }) => (
        <div className="text-sm font-medium">
          {row.original?.buyerCompanyName}
        </div>
      ),
    },
    {
      accessorKey: 'buyerContactPerson',
      header: 'Contact Person',
      cell: ({ row }) => (
        <div className="text-sm font-medium">
          {row.original?.buyerContactPerson}
        </div>
      ),
    },
    {
      id: 'buyerEmail',
      header: 'Contact Details',
      cell: ({ row }) => {
        return (
          <div className="text-sm leading-5">
            <div> {row?.original?.buyerEmail}</div>
            <div>{row?.original?.buyerContactNumber}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => (
        <div className="text-sm font-medium">{row?.original?.priority}</div>
      ),
    },
  ];

  return (
    <div
      className={`flex flex-col gap-4 p-4 transition-all duration-300 ${
        sideOpen ? 'lg:pl-4' : 'lg:pl-4'
      }`}
    >
      <SupportTickets />
      <div
        className={`w-full ${
          sideOpen
            ? 'lg:max-w-[calc(100vw-20rem)]'
            : 'lg:max-w-[calc(100vw-5rem)]'
        }`}
      >
        <DashboardTable
          data={supportData}
          columns={Columns}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
          totalDataCount={totalCount}
          setPage={setPage}
          pageOptions={[5, 10, 20]}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          page={page}
          rowPerPage={rowPerPage}
          setRowPerPage={setRowPerPage}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}
