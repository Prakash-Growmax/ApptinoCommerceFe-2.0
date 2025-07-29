// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ColumnDef } from '@tanstack/react-table';

// import { PageHeader } from '@/components/templates/PageLayout/PageLayout';
// import DashboardTable from '@/components/organisms/DashboardTable/DashboardTable';
// import { DataCard } from '@/components/ui/data-card';
// import { StatusBadge } from '@/components/ui/status-badge';
// import { TYPOGRAPHY } from '@/lib/design-system/constants';
// import { cn } from '@/lib/utils';
// import { ShadCnButton as Button } from '@/components/ui/button';
// import { Dialog, DialogTrigger } from '@/components/ui/dialog';

// import SupportFilters from '../components/SupportFilters';
// import { useGetSupportTicketFilters } from '../hook/useGetSupportTicketFilter';
// import useSupportStore from '../store/useSupportStore';
// import SupportTicketsDialog from '../routes/createticket';

// export default function SupportLanding() {
//   const navigate = useNavigate();
//   const [createDialogOpen, setCreateDialogOpen] = useState(false);
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 20,
//   });

//   useGetSupportTicketFilters();
//   const {
//     supportData,
//     page,
//     setPage,
//     rowPerPage,
//     setRowPerPage,
//     totalCount,
//     loading,
//   } = useSupportStore();

//   const handleRowClick = (row: any) => {
//     navigate(`/supporttickets/servicedetails/${row?.ticketIdentifier}`);
//   };

//   const handlePrevious = () => {
//     setPage(prev => prev - 1);
//   };

//   const handleNext = () => {
//     setPage(prev => prev + 1);
//   };

//   const getStatusVariant = (status: string): 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' => {
//     const normalizedStatus = status?.toUpperCase();
//     switch (normalizedStatus) {
//       case 'OPEN':
//         return 'warning';
//       case 'INPROGRESS':
//       case 'IN PROGRESS':
//         return 'secondary';
//       case 'COMPLETED':
//         return 'success';
//       case 'WAITING FOR CUSTOMER':
//         return 'outline';
//       default:
//         return 'default';
//     }
//   };

//   const getPriorityVariant = (priority: string): 'default' | 'secondary' | 'destructive' => {
//     const normalizedPriority = priority?.toUpperCase();
//     switch (normalizedPriority) {
//       case 'HIGH':
//         return 'destructive';
//       case 'MEDIUM':
//         return 'secondary';
//       case 'LOW':
//       default:
//         return 'default';
//     }
//   };

//   const Columns: ColumnDef<any>[] = [
//     {
//       accessorKey: 'ticketIdentifier',
//       header: 'Ticket ID',
//       cell: ({ row }) => (
//         <div className={cn(TYPOGRAPHY.bodySmall, "font-mono")}>
//           {row.original?.ticketIdentifier || <span className={TYPOGRAPHY.caption}>-</span>}
//         </div>
//       ),
//     },
//     {
//       accessorKey: 'buyerCompanyName',
//       header: 'Company',
//       cell: ({ row }) => (
//         <div className={cn(TYPOGRAPHY.bodySmall, "font-medium")}>
//           {row.original?.buyerCompanyName || <span className={TYPOGRAPHY.caption}>-</span>}
//         </div>
//       ),
//     },
//     {
//       accessorKey: 'title',
//       header: 'Subject',
//       cell: ({ row }) => (
//         <div className={cn(TYPOGRAPHY.bodySmall, "max-w-[200px] truncate")}>
//           {row.original?.title || <span className={TYPOGRAPHY.caption}>-</span>}
//         </div>
//       ),
//     },
//     {
//       accessorKey: 'createdDateTime',
//       header: 'Created',
//       cell: ({ row }) => {
//         const dateStr = row?.original?.createdDateTime;
//         const formattedDate = dateStr
//           ? new Date(dateStr).toLocaleDateString('en-GB', {
//               day: '2-digit',
//               month: '2-digit',
//               year: '2-digit',
//             })
//           : null;

//         return (
//           <div className={TYPOGRAPHY.bodySmall}>
//             {formattedDate || <span className={TYPOGRAPHY.caption}>-</span>}
//           </div>
//         );
//       },
//     },
//     {
//       accessorKey: 'dueDateTime',
//       header: 'Due On',
//       cell: ({ row }) => {
//         const dueDateStr = row?.original?.dueDateTime;
//         const formattedDueDate = dueDateStr
//           ? new Date(dueDateStr).toLocaleDateString('en-GB', {
//               day: '2-digit',
//               month: '2-digit',
//               year: '2-digit',
//             })
//           : null;

//         return (
//           <div className={TYPOGRAPHY.bodySmall}>
//             {formattedDueDate || <span className={TYPOGRAPHY.caption}>-</span>}
//           </div>
//         );
//       },
//     },
//     {
//       accessorKey: 'category',
//       header: 'Category',
//       cell: ({ row }) => (
//         <div className={TYPOGRAPHY.bodySmall}>
//           {row.original?.category || <span className={TYPOGRAPHY.caption}>-</span>}
//         </div>
//       ),
//     },
//     {
//       accessorKey: 'status',
//       header: 'Status',
//       cell: ({ row }) => {
//         const status = row?.original?.status;
//         if (!status) return <span className={TYPOGRAPHY.caption}>-</span>;
        
//         return (
//           <StatusBadge variant={getStatusVariant(status)}>
//             {status}
//           </StatusBadge>
//         );
//       },
//     },
//     {
//       accessorKey: 'buyerContactPerson',
//       header: 'Contact',
//       cell: ({ row }) => (
//         <div className={TYPOGRAPHY.bodySmall}>
//           {row.original?.buyerContactPerson || <span className={TYPOGRAPHY.caption}>-</span>}
//         </div>
//       ),
//     },
//     {
//       id: 'buyerEmail',
//       header: 'Contact Info',
//       cell: ({ row }) => {
//         const email = row?.original?.buyerEmail;
//         const phone = row?.original?.buyerContactNumber;
        
//         if (!email && !phone) {
//           return <span className={TYPOGRAPHY.caption}>-</span>;
//         }

//         return (
//           <div className="space-y-0.5">
//             {email && (
//               <div className={cn(TYPOGRAPHY.caption, "truncate max-w-[180px]")}>
//                 {email}
//               </div>
//             )}
//             {phone && (
//               <div className={TYPOGRAPHY.caption}>
//                 {phone}
//               </div>
//             )}
//           </div>
//         );
//       },
//     },
//     {
//       accessorKey: 'priority',
//       header: 'Priority',
//       cell: ({ row }) => {
//         const priority = row?.original?.priority;
//         if (!priority) return <span className={TYPOGRAPHY.caption}>-</span>;
        
//         return (
//           <StatusBadge variant={getPriorityVariant(priority)}>
//             {priority}
//           </StatusBadge>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="p-4 sm:p-6 pb-2 sm:pb-4">
//         <PageHeader 
//           title="Support Tickets" 
//           subtitle="Manage and track customer support requests"
//           action={
//             <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button>
//                   Create Ticket
//                 </Button>
//               </DialogTrigger>
//               <SupportTicketsDialog />
//             </Dialog>
//           }
//         />
//       </div>
//       <div className="px-4 sm:px-6 pb-4 sm:pb-6">
//         <div className="w-full">
//           <div className="bg-background border border-border rounded-lg overflow-hidden">
//             <div className="border-b border-border">
//               <SupportFilters />
//             </div>
//             <DashboardTable
//             data={supportData}
//             columns={Columns}
//             loading={loading}
//             pagination={pagination}
//             setPagination={setPagination}
//             totalDataCount={totalCount}
//             setPage={setPage}
//             pageOptions={[10, 20, 50, 100]}
//             handlePrevious={handlePrevious}
//             handleNext={handleNext}
//             page={page}
//             rowPerPage={rowPerPage || 20}
//             setRowPerPage={setRowPerPage}
//             onRowClick={handleRowClick}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';

import { PageHeader } from '@/components/templates/PageLayout/PageLayout';
import DashboardTable from '@/components/organisms/DashboardTable/DashboardTable';
import { StatusBadge } from '@/components/ui/status-badge';
import { TYPOGRAPHY } from '@/lib/design-system/constants';
import { cn } from '@/lib/utils';
import { ShadCnButton as Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import SupportFilters from '../components/SupportFilters';
import { useGetSupportTicketFilters } from '../hook/useGetSupportTicketFilter';
import useSupportStore from '../store/useSupportStore';
import SupportTicketsDialog from '../routes/createticket';
import { GetFetchSupportTicket } from '../api/support.api';
import useAppStore from '@/stores/appStore';
import { TokenPayload } from '@/types/auth.types';
import { handleError } from '@/utils/errorHandling';

export default function SupportLanding() {
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
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
    setSupportData,
    setTotalCount,
    setLoading,
  } = useSupportStore();

  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { tenantId } = payload as TokenPayload;

  // ✅ Fetch tickets on first render
  useEffect(() => {
    const fetchInitialTickets = async () => {
      setLoading(true);
      try {
        const response = await GetFetchSupportTicket({
          tenantId,
          page,
          rowPerPage,
          body: {},
          token,
        });
        setSupportData(response?.result || []);
        setTotalCount(response?.count || 0);
      } catch (err) {
        handleError(err, 'initialLoad', 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTickets();
  }, [page, rowPerPage]);

  const handleRowClick = (row: any) => {
    navigate(`/supporttickets/servicedetails/${row?.ticketIdentifier}`);
  };

  const handlePrevious = () => {
    setPage(prev => prev - 1);
  };

  const handleNext = () => {
    setPage(prev => prev + 1);
  };

  const getStatusVariant = (status: string) => {
    const normalizedStatus = status?.toUpperCase();
    switch (normalizedStatus) {
      case 'OPEN':
        return 'warning';
      case 'INPROGRESS':
      case 'IN PROGRESS':
        return 'secondary';
      case 'COMPLETED':
        return 'success';
      case 'WAITING FOR CUSTOMER':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getPriorityVariant = (priority: string) => {
    const normalizedPriority = priority?.toUpperCase();
    switch (normalizedPriority) {
      case 'HIGH':
        return 'destructive';
      case 'MEDIUM':
        return 'secondary';
      case 'LOW':
      default:
        return 'default';
    }
  };

  const Columns: ColumnDef<any>[] = [
    {
      accessorKey: 'ticketIdentifier',
      header: 'Ticket ID',
      cell: ({ row }) => (
        <div className={cn(TYPOGRAPHY.bodySmall, "font-mono")}>
          {row.original?.ticketIdentifier || <span className={TYPOGRAPHY.caption}>-</span>}
        </div>
      ),
    },
    {
      accessorKey: 'buyerCompanyName',
      header: 'Company',
      cell: ({ row }) => (
        <div className={cn(TYPOGRAPHY.bodySmall, "font-medium")}>
          {row.original?.buyerCompanyName || <span className={TYPOGRAPHY.caption}>-</span>}
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Subject',
      cell: ({ row }) => (
        <div className={cn(TYPOGRAPHY.bodySmall, "max-w-[200px] truncate")}>
          {row.original?.title || <span className={TYPOGRAPHY.caption}>-</span>}
        </div>
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
          : null;

        return (
          <div className={TYPOGRAPHY.bodySmall}>
            {formattedDate || <span className={TYPOGRAPHY.caption}>-</span>}
          </div>
        );
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
          : null;

        return (
          <div className={TYPOGRAPHY.bodySmall}>
            {formattedDueDate || <span className={TYPOGRAPHY.caption}>-</span>}
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div className={TYPOGRAPHY.bodySmall}>
          {row.original?.category || <span className={TYPOGRAPHY.caption}>-</span>}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row?.original?.status;
        if (!status) return <span className={TYPOGRAPHY.caption}>-</span>;
        
        return (
          <StatusBadge variant={getStatusVariant(status)}>
            {status}
          </StatusBadge>
        );
      },
    },
    {
      accessorKey: 'buyerContactPerson',
      header: 'Contact',
      cell: ({ row }) => (
        <div className={TYPOGRAPHY.bodySmall}>
          {row.original?.buyerContactPerson || <span className={TYPOGRAPHY.caption}>-</span>}
        </div>
      ),
    },
    {
      id: 'buyerEmail',
      header: 'Contact Info',
      cell: ({ row }) => {
        const email = row?.original?.buyerEmail;
        const phone = row?.original?.buyerContactNumber;
        
        if (!email && !phone) {
          return <span className={TYPOGRAPHY.caption}>-</span>;
        }

        return (
          <div className="space-y-0.5">
            {email && (
              <div className={cn(TYPOGRAPHY.caption, "truncate max-w-[180px]")}>
                {email}
              </div>
            )}
            {phone && (
              <div className={TYPOGRAPHY.caption}>
                {phone}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row?.original?.priority;
        if (!priority) return <span className={TYPOGRAPHY.caption}>-</span>;
        
        return (
          <StatusBadge variant={getPriorityVariant(priority)}>
            {priority}
          </StatusBadge>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 sm:p-6 pb-2 sm:pb-4">
        <PageHeader 
          title="Support Tickets" 
          subtitle="Manage and track customer support requests"
          action={
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  Create Ticket
                </Button>
              </DialogTrigger>
              <SupportTicketsDialog />
            </Dialog>
          }
        />
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="w-full">
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="border-b border-border">
              <SupportFilters />
            </div>
            <DashboardTable
              data={supportData}
              columns={Columns}
              loading={loading}
              pagination={pagination}
              setPagination={setPagination}
              totalDataCount={totalCount}
              setPage={setPage}
              pageOptions={[5, 10, 20, 50, 100]}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              page={page}
              rowPerPage={rowPerPage || 20}
              setRowPerPage={setRowPerPage}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
