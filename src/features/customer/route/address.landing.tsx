import useAccountsStore from "@/stores/useAccountStore";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCustomersWithFilters } from "../hook/useGetCustomersDetails";
import useSideBarStore from "@/stores/sidebarStore";
import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";
// import { useGetAddressDetails } from "../hook/useGetaddress";



const CustomerDetail = () => {

    const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, 
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
  // useGetAddressDetails();
  useFetchCustomersWithFilters();
  

  const columns: ColumnDef<any>[] = [
  {
    id: 'name',
    accessorKey: 'branchName',
    header: 'Branch Name',
    cell: ({ getValue }) => {
      const value = getValue();
      return <span>{value || '-'}</span>;
    },
  },
   {
  id: "addressId",
  header: "Address",
  cell: ({ row }) => {  
    const address = row?.original?.addressId;

    return (
      
      <div className="text-sm leading-5">
        <div>{address?.addressTags?.addressLine}</div>
        <div>{address?.state}</div>
        <div>{address?.pinCodeId}</div>
        <div>{address?.country}</div>
      </div>
    );
  },
},
  {
    id: 'gst',
    accessorKey: 'gst',
    header: 'Tax ID',
    cell: ({ getValue }) => {
      const value = getValue();
      return <span>{value || '-'}</span>;
    },
  },
  {
    id: 'primaryContact',
    accessorKey: 'primaryContact',
    header: 'Contact',
    cell: ({ getValue }) => {
      const value = getValue();
      return <span>{value || '-'}</span>;
    },
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ getValue }) => {
      const value = getValue();
      return <span>{value || '-'}</span>;
    },
  },
];



// const handleRowClick = (row: any) => {
//       console.log(row);
//     navigate(/customers/customerdetails/${row?.companyID});
//   };
//   const handlePrevious = () => {
//     setPage(prev => prev - 1);
//   };

//   const handleNext = () => {
//     setPage(prev => prev + 1);
//   };
//   const { sideOpen } = useSideBarStore();


  return (
    <div>
      <h2 className="text-xl font-bold"> Address</h2>

          <div className="w-full overflow-hidden">
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
        // setRowPerPage={setRowPerPage}
        // handlePrevious={handlePrevious}
        // handleNext={handleNext}
        tableHeight="h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]"
        // onRowClick={handleRowClick}
      />
    </div>
    </div>
  );
};

export default CustomerDetail;









// import { ColumnDef } from "@tanstack/react-table";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";
// import useAccountsStore from "@/stores/useAccountStore";
// import { useGetAddressDetails } from "../hook/useGetaddress";

// type CustomerDetailProps = {
//   addressData: any[]; 
// };

// const CustomerDetail = ({ addressData }: CustomerDetailProps) => {
//   console.log("Address Data:", addressData);

//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 5,
//   });

//   const navigate = useNavigate();
//   const {
//     loading,
//     page,
//     setPage,
//     rowPerPage,
//     setRowPerPage,
//     totalCount,
//   } = useAccountsStore();
//   // useGetAddressDetails();

//   const columns: ColumnDef<any>[] = [
//   {
//     id: 'name',
//     accessorKey: 'name',
//     header: 'Branch Name',
//     cell: ({ row }) => <span>{row.original?.name || '-'}</span>,
//   },
//   {
//     id: 'addressId',
//     header: 'Address',
//     cell: ({ row }) => {
//       const address = row.original?.addressId || {};
//       const addressLine = address?.addressLine || '';
//       const state = address?.state || '';
//       const pin = address?.pinCodeId || '';
//       const country = address?.country || '';

//       const fullAddress = [addressLine, state, pin, country].filter(Boolean).join(', ');
//       return <span className="text-sm">{fullAddress || '-'}</span>;
//     },
//   },
//   {
//     id: 'gst',
//     accessorKey: 'gst',
//     header: 'Tax ID',
//     cell: ({ row }) => <span>{row.original?.gst || '-'}</span>,
//   },
//   {
//     id: 'contact',
//     header: 'Contact',
//     cell: ({ row }) => <span>{row.original?.contact || '-'}</span>,
//   },
//   {
//     id: 'phone',
//     header: 'Phone',
//     cell: ({ row }) => <span>{row.original?.phone || '-'}</span>,
//   },
// ];

//   const handleRowClick = (row: any) => {
//     console.log(row);
//     navigate(`/customers/customerdetails/${row?.companyID}`);
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Customer Address</h2>
//       <div className="w-full overflow-hidden">
//         <DashboardTable
//           data={addressData}
//           columns={columns}
//           loading={loading}
//           pagination={pagination}
//           setPagination={setPagination}
//           totalDataCount={totalCount}
//           pageOptions={[5, 10, 20]}
//           page={page}
//           setPage={setPage}
//           rowPerPage={rowPerPage}
//           setRowPerPage={setRowPerPage}
//           handlePrevious={() => setPage((prev) => prev - 1)}
//           handleNext={() => setPage((prev) => prev + 1)}
//           tableHeight="h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]"
//           onRowClick={handleRowClick}
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomerDetail;















