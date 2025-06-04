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
    id: "city",
    accessorKey: "city",
    header: "City",
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
    id: "state",
    accessorKey: "state",
    header: "State",
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
    id: "erp_Code",
    accessorKey: "erp_Code",
    header: "ERP Code",
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
    id: "isActivated",
    accessorKey: "isActivated",
    header: "Status",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-md ${
            value === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {value === 1 ? "Active" : "Inactive"}
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