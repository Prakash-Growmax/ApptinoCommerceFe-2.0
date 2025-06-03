import useUserStore from "@/stores/useUserStore";
import { getFilter } from "./api/filterapi";
import { useEffect, useState } from "react";
import { useGetCustomersFilters } from "@/hooks/useGetCustomersFilters";

import { useGetCustomers } from "@/hooks/useGetCustomers";
import { ColumnDef } from "@tanstack/react-table";
import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";
import useAccountsStore from "@/stores/useAccountStore";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const CustomerLanding=()=>{
    const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, // Default page size
  });
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
    id: "subIndustry",
    accessorKey: "subIndustry",
    header: "Industry Type",
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
  {
    id:"accountOwner",
    accessorKey:"accountOwner",
    header: "Account Owner",
      cell: ({ getValue }) => {
      const value = getValue();
    
     
      return (
       <div className="flex items-center space-x-2">
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
  }
];
    return(
         <div className="w-full">
         <DashboardTable
         data={data}
          columns={columns}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={1}
         />
        </div>
    )

}
export default CustomerLanding;