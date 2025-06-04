// import React, { useEffect } from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";
// import useSupportStore from "@/stores/useSupportStore";
// import { useGetSupportFilters } from "@/hooks/useGetSupportFilters";
// import { useGetSupportsUser } from "@/hooks/useGetSupportsUser";

// const SupportLandingPage = () => {
//   // const { filters, data, loading } = useSupportStore();

//   const { data: filtersData, isLoading: filtersLoading } = useGetSupportFilters();

//   // useEffect to update filters in store if API response changed
//   useEffect(() => {
//     if (filtersData) {
//       // filters already set inside useGetSupportFilters hook
//     }
//   }, [filtersData]);

//   // const { data: supportsData, isLoading: supportsLoading } = useGetSupports({ filters });

//   const columns: ColumnDef<any>[] = [
//     {
//       id: "ticketId",
//       accessorKey: "ticketId",
//       header: "Ticket ID",
//     },
//     {
//       id: "subject",
//       accessorKey: "subject",
//       header: "Subject",
//     },
//     {
//       id: "createdDate",
//       accessorKey: "createdDate",
//       header: "Created Date",
//       cell: ({ getValue }) => {
//         const value = getValue();
//         return <span>{new Date(value).toLocaleDateString()}</span>;
//       },
//     },
//     {
//       id: "status",
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ getValue }) => {
//         const value = getValue();
//         return (
//           <span
//             className={`text-xs font-medium px-2 py-1 rounded-md ${
//               value === "open"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {value}
//           </span>
//         );
//       },
//     },
//   ];

//   // return (
//   //   <div className="w-full">
//   //     {/* Optional: Add filters UI here, and update the store on change */}

//   //     <DashboardTable data={data} columns={columns} loading={loading || filtersLoading || supportsLoading} />
//   //   </div>
//   // );
// };

// export default SupportLandingPage;



import useUserStore from "@/stores/useUserStore";
import { getFilter } from "./api/filterapi";
import { useEffect } from "react";
import { useGetCustomersFilters } from "@/hooks/useGetCustomersFilters";

import { useGetCustomers } from "@/hooks/useGetCustomers";
import { ColumnDef } from "@tanstack/react-table";
import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";
import useAccountsStore from "@/stores/useAccountStore";

const CustomerLanding=()=>{
const {data,filters,loading}=useAccountsStore();
 useGetCustomersFilters();
  useGetCustomers({filters})

const columns: ColumnDef<any>[] = [
  {
    id: "companyName",
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    id: "stats",
    accessorKey: "stats",
    header: "Stats",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span>
          {value ? value : "_"}
        </span>
      );
    },
  },
  {
    id: "priority",
    accessorKey: "priority",
    header: "Priority",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span>
          {value ? value : "_"}
        </span>
      );
    },
  },
  {
    id: "dob",
    accessorKey: "dob",
    header: "Dob",
      cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span>
          {value ? value : "_"}
        </span>
      );
    },
  },
  {
    id: "assigned technician ",
    accessorKey: "assigned technician",
    header: "Assigned technician",
      cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span>
          {value ? value : "_"}
        </span>
      );
    },
  },
  
];
    return(
         <div className="w-full">
         <DashboardTable
         data={data}
          columns={columns}
          loading={loading}
         />
        </div>
    )

}
export default CustomerLanding;