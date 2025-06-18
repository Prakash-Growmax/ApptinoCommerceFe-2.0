import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";
import useAccountsStore from "@/stores/useAccountStore";
import { useGetAddressDetails } from "../hook/usegetaddress";

type CustomerDetailProps = {
  addressData: any[]; 
};

const CustomerDetail = ({ addressData }: CustomerDetailProps) => {
    console.log("Address Data:", addressData);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const navigate = useNavigate();
  const {
    loading,
    page,
    setPage,
    rowPerPage,
    setRowPerPage,
    totalCount,
  } = useAccountsStore();
  useGetAddressDetails();
  

  const columns: ColumnDef<any>[] = [
  {
    id: 'name',
    accessorKey: 'branchName',
    header: 'Branch Name',
    cell: ({ row }) => <span>{row.original?.branchName || '-'}</span>,
  },
  {
    id: 'addressId',
    header: 'Address',
    cell: ({ row }) => {
      const address = row.original?.addressId;
      const addressLine = address?.addressLine || '';
      const state = address?.state || '';
      const pin = address?.pinCodeId || '';
      const country = address?.country || '';

      const fullAddress = [addressLine, state, pin, country].filter(Boolean).join(', ');

      return <span className="text-sm">{fullAddress || '-'}</span>;
    },
  },
  {
    id: 'gst',
    accessorKey: 'gst',
    header: 'Tax ID',
    cell: ({ row }) => <span>{row.original?.gst || '-'}</span>,
  },
  {
    id: 'primaryContact',
    header: 'Contact',
    cell: ({ row }) => <span>{row.original?.primaryContact || '-'}</span>,
  },
  {
    id: 'phone',
    header: 'Phone',
    cell: ({ row }) => <span>{row.original?.phone || '-'}</span>,
  },
];


  const handleRowClick = (row: any) => {
    console.log(row);
    navigate(`/customers/customerdetails/${row?.companyID}`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customer Address</h2>
      <div className="w-full overflow-hidden">
        <DashboardTable
          data={addressData}
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
          handlePrevious={() => setPage((prev) => prev - 1)}
          handleNext={() => setPage((prev) => prev + 1)}
          tableHeight="h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]"
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default CustomerDetail;














// src/features/customer/route/CustomerDetail.tsx


// import { useState } from "react";
// import { AddressDetailsType } from "../schema/address.schema";
// import { ColumnDef } from "@tanstack/react-table";
// import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";

// const CustomerDetail = ({ addressData }: { addressData: AddressDetailsType }) => {
//   const data = addressData?.data?.addressTags ?? []; // use the address list
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 5,
//   });

//   const columns: ColumnDef<any>[] = [
//     {
//       id: 'branchName',
//       accessorKey: 'branch.branchName',
//       header: 'Branch Name',
//       cell: ({ row }) => <span>{row.original?.branch?.branchName || '-'}</span>,
//     },
//     {
//       id: 'address',
//       header: 'Address',
//       cell: ({ row }) => {
//         const a = row.original;
//         const full = [a?.addressLine, a?.state, a?.pinCodeId, a?.country]
//           .filter(Boolean)
//           .join(', ');
//         return <span className="text-sm">{full || '-'}</span>;
//       },
//     },
//     {
//       id: 'gst',
//       accessorKey: 'gst',
//       header: 'Tax ID',
//       cell: ({ row }) => <span>{row.original?.gst || '-'}</span>,
//     },
//     {
//       id: 'primaryContact',
//       header: 'Contact',
//       cell: ({ row }) => <span>{row.original?.contact || '-'}</span>,
//     },
//     {
//       id: 'phone',
//       header: 'Phone',
//       cell: ({ row }) => <span>{row.original?.phone || '-'}</span>,
//     },
//   ];

//   return (
//     <div>
//       <h2 className="text-xl font-bold">Customer Address</h2>
//       <div className="w-full overflow-hidden">
//         <DashboardTable
//           data={data}
//           columns={columns}
//           loading={false}
//           pagination={pagination}
//           setPagination={setPagination}
//           totalDataCount={data.length}
//           pageOptions={[5, 10, 20]}
//           page={pagination.pageIndex}
//           setPage={(p) => setPagination(prev => ({ ...prev, pageIndex: p }))}
//           rowPerPage={pagination.pageSize}
//           setRowPerPage={(size) => setPagination(prev => ({ ...prev, pageSize: size }))}
//           handlePrevious={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex - 1 }))}
//           handleNext={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
//           tableHeight="h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]"
//           onRowClick={(row) => console.log(row)}
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomerDetail;

