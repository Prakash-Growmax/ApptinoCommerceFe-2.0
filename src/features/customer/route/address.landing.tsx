import useAccountsStore from "@/stores/useAccountStore";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCustomersWithFilters } from "../hook/useGetCustomersDetails";
import useSideBarStore from "@/stores/sidebarStore";
import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";
import { TableCellText } from "@/components/ui/table-typography";

import { useGetAddressDetails } from "../hook/useGetaddress";
import { useCompanyAddressDataStore } from "../store/useCompanyAddressDataStore";
import { useGetCustomerAddress } from "../hook/useGetCustomerAddress";




const CustomerDetail = ({addressData,page,setPage,rowPerPage,setRowPerPage,loading,totalCount}) => {

    const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, 
  });
  const { sideOpen } = useSideBarStore();
 
 
  const columns: ColumnDef<any>[] = [
  {
    id: 'branchName',
    accessorKey: 'branchName',
    header: 'Branch Name',
    cell:({row})=>{
       return(
        <TableCellText variant="primary">
          {row?.original?.branch?.addressId?.branchName}
        </TableCellText>
       )
    }
  },
{
  id: "addressId",
  header: "Address",
  cell: ({ row }) => {  
    const address = row?.original?.branch?.addressId;

    return (
      <TableCellText className="flex flex-col">
        <span>{address?.locality}</span>
        <span>{address?.addressLine}</span>
        <span>
          {address?.state} {address?.pinCodeId}
        </span>
        <span>{address?.country}</span>
      </TableCellText>
    );
  },
},

  {
    id: 'gst',
    accessorKey: 'gst',
    header: 'Tax ID',
     cell:({row})=>{
       return(
        <TableCellText variant="primary">
          {row?.original?.branch?.addressId?.gst}
        </TableCellText>
       )
    }
  },
  {
    id: 'primaryContact',
    accessorKey: 'primaryContact',
    header: 'Contact',
      cell:({row})=>{
       return(
        <TableCellText variant="primary">
          {row?.original?.branch?.addressId?.primaryContact}
        </TableCellText>
       )
    }
  },
  {
    id: 'mobileNo',
    accessorKey: 'mobileNo',
    header: 'Phone',
       cell:({row})=>{
       return(
        <TableCellText variant="primary">
          {row?.original?.branch?.addressId?.mobileNo || "_"}
        </TableCellText>
       )
    }
  },
    {
    id: 'zoneId',
    accessorKey: 'zoneId',
    header: 'Zone',
       cell:({row})=>{
       return(
        <TableCellText variant="primary">
          {row?.original?.zoneId?.zoneId?.zoneName || "_"}
        </TableCellText>
       )
    }
  },
     {
      id: 'addressFor',
      header: '',
      cell: ({ row }) => {
        const addr = row.original?.branch?.addressId;
        return (
          <div className="flex flex-col justify-evenly h-[90px] text-primary text-xs">
            {addr?.regAddress && <span>Registered</span>}
            {addr?.isBilling&& <span>Billing</span>}
            {addr?.isShipping && <span>Shipping</span>}
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

return(
     <div
      className={`flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 transition-all duration-300 w-full ${
        sideOpen
          ? 'lg:max-w-[calc(100vw-20rem)]'
          : 'lg:max-w-[calc(100vw-5rem)]'
      }`}
    >
    <DashboardTable
       data={addressData}
          columns={columns}
           pageOptions={[5,10,20]}
           loading={loading}
           page={page}
           totalDataCount={totalCount}
           setPage={setPage}
           rowPerPage={rowPerPage}
           setRowPerPage={setRowPerPage}
           handlePrevious={handlePrevious}
           handleNext={handleNext}
           pagination={pagination}
            tableHeight="min-h-[200px] max-h-[60vh] " 

    />
  </div>
)

};

export default CustomerDetail;









