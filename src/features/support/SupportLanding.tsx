import { useEffect, useState } from "react";
import { useGetSupportFilters } from "@/hooks/useGetSupportUsers";
import { useGetSupportTicketFilters } from "./hook/useGetSupportTicketFilter";
import useSupportStore from "./store/useSupportStore";
import { ColumnDef } from "@tanstack/react-table";
import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";
import useSideBarStore from "@/stores/sidebarStore";

export default function SupportLandingPage() {
  // const { getSupportData } = useGetSupportFilters();
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20, // You can change this as needed
      });
   useGetSupportTicketFilters();
  const {supportData,page,setPage,rowPerPage,setRowPerPage,totalCount,loading} = useSupportStore();
  const {sideOpen} = useSideBarStore();
  const Columns: ColumnDef<any>[] = [
    {
      accessorKey:"title",
      header:"Subject",
        cell: ({ row }) => (
      <div className="text-sm font-medium">{row.original?.title}</div>
    ),
    },
    {
      accessorKey:"ticketIdentifier",
      header:"Ticket Id",
            cell: ({ row }) => (
      <div className="text-sm font-medium">{row.original?.ticketIdentifier}</div>
    ),
    },
 {
  accessorKey: "createdDateTime",
  header: "Created Date",
  cell: ({ row }) => {
    const dateStr = row?.original?.createdDateTime;
    const formattedDate = dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
      : "--";

    return (
      <div className="text-sm font-medium">{formattedDate}</div>
    );
  },
},
     {
  accessorKey: "dueDateTime",
  header: "Due On",
  cell: ({ row }) => {
    const dueDateStr = row?.original?.dueDateTime;
    const formattedDueDate = dueDateStr
      ? new Date(dueDateStr).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
      : "--";

    return (
      <div className="text-sm font-medium">{formattedDueDate}</div>
    );
  },
},

  {
      accessorKey:"category",
      header:"Category",
        cell: ({ row }) => (
      <div className="text-sm font-medium">{row.original?.category}</div>
    ),
    },
     {
      accessorKey:"status",
      header:"Status",
        cell: ({ row }) => {
           switch (row?.original?.status){
               case "Open": {
                return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#FBC02D] text-[#FBC02D]" >
           {row?.original?.status}
          </span>
          );
          }
          case "OPEN": {
                return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#FBC02D] text-[#FBC02D]" >
           {row?.original?.status}
          </span>
          );
          }
             case "Inprogress": {
                return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#F57C00] text-[#F57C00]" >
           {row?.original?.status}
          </span>
          );
          }
          case "INPROGRESS": {
                return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#F57C00] text-[#F57C00]" >
           {row?.original?.status}
          </span>
          );
          }
          case "IN PROGRESS": {
                return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#F57C00] text-[#F57C00]" >
           {row?.original?.status}
          </span>
          );
          }
             case "Completed": {
                return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#4caf50] text-[#4caf50]" >
           {row?.original?.status}
          </span>
          );
          }
               case "COMPLETED": {
                return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-[#4caf50] text-[#4caf50]" >
           {row?.original?.status}
          </span>
          );
          }
                 case "Waiting For Customer": {
                return (
              <span className="text-xs font-medium px-2 py-1 rounded-md border border-primary text-primary" >
           {row?.original?.status}
          </span>
          );
          }
                 case "WAITING FOR CUSTOMER": {
                return (
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-primary text-primary" >
           {row?.original?.status}
          </span>
          );
          }
           }
           }
          
        },
         {
      accessorKey:"buyerCompanyName",
      header:"Company Name",
        cell: ({ row }) => (
      <div className="text-sm font-medium">{row.original?.buyerCompanyName}</div>
    ),
    },
          {
      accessorKey:"buyerContactPerson",
      header:"Contact Person",
        cell: ({ row }) => (
      <div className="text-sm font-medium">{row.original?.buyerContactPerson}</div>
    ),
    },
     {
  id: "buyerEmail",
  header: "Contact Details",
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
      accessorKey:"priority",
      header:"Priority",
        cell: ({ row }) => (
      <div className="text-sm font-medium">{row?.original?.priority}</div>
    ),
    }, 
    
    
  ]
   const handlePrevious = () => {
     
       setPage((prev) => prev - 1);
  };

  const handleNext = () => {
  
    setPage((prev) => prev + 1);
  };
  console.log(sideOpen);
  return (
    <div className={sideOpen ? "lg:w-[1150px]" : "w-full p-4"}>
          <DashboardTable
        data={supportData}
        columns={Columns}
        loading={loading}
        pagination={pagination}
        setPagination={setPagination}
        totalDataCount={totalCount} // 👈 dynamically calculated
        setPage={setPage}
        pageOptions={[5,10,20]}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        page={page}
        rowPerPage={rowPerPage}
         setRowPerPage={setRowPerPage}
      />
     
    </div>
  );
}
