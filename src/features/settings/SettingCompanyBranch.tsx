
import { useGetBranchDetails } from "./hook/useGetBranchDetails";
import { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useCompanyBranchStore from "./store/useCompanyBranchStore";
import { useState } from "react";
import DashboardTable from "@/components/organisms/DashboardTable/DashboardTable";
import { Slice } from "lucide-react";

const SettingCompanyBranch=()=>{
      const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20, // You can change this as needed
      });
    const {branchData,loading,totalCount,page,setPage,rowPerPage,setRowPerPage}=useCompanyBranchStore();
    useGetBranchDetails();
    const getCustomLabel = (key: string, address: any) => address?.labels?.[key] || null;
const getIsHidden = (key: string, address: any) => address?.hidden?.includes(key);
const getGST = (address: any) => address?.gst || null;
const formatAddress = (addressArray: string[][] = []) =>
  addressArray.map((line, i) => (
    <div key={i}>
      {line.join(" ")} <br />
    </div>
  ));

// Replace with props/state if dynamic
const address = {};
const seller = true;
const Columns: ColumnDef<any>[] = [
  {
    accessorKey: "branchName",
    header: () => getCustomLabel("branchName", address) || "Branch Name",
    cell: ({ row }) => (
      <div className="text-sm font-medium">{row.original?.addressId?.branchName}</div>
    ),
    enableHiding: !getIsHidden("branchName", address),
  },
{
  id: "addressData",
  header: "Address",
  cell: ({ row }) => {
    const address = row?.original?.addressId;

    return (
      <div className="text-sm leading-5">
        <div>{address?.city}</div>
        <div>{address?.state}</div>
        <div>{address?.pinCodeId}</div>
        <div>{address?.country}</div>
      </div>
    );
  },
},
  {
    accessorKey: "gst",
    header: () => getCustomLabel("gst", address) || "Tax ID",
    enableHiding: !getIsHidden("gst", address),
    cell: ({ row }) => (
      <div className="text-sm">{getGST(row.original?.addressId) || "-"}</div>
    ),
  },
  {
    accessorKey: "addressId.primaryContact",
    header: () => getCustomLabel("primaryContact", address) || "Contact",
    enableHiding: !getIsHidden("primaryContact", address),
    cell: ({ row }) => (
      <div className="text-sm">{row.original?.addressId?.primaryContact || "-"}</div>
    ),
  },
  {
    accessorKey: "addressId.mobileNo",
    header: () => getCustomLabel("mobileNo", address) || "Phone",
    enableHiding: !getIsHidden("mobileNo", address),
    cell: ({ row }) => {
      const mobile = row.original?.addressId?.mobileNo;
      const countryCode = row.original?.addressId?.countryCode || "+91";
      return (
        <div className="text-sm whitespace-nowrap">
          {mobile ? `${mobile}` : "-"}
        </div>
      );
    },
  },
  {
    id: "businessUnit",
    header: "Business Unit",
    enableHiding: !seller,
    cell: ({ row }) => {
      const units = row.original?.businessUnits || [];
      return (
        <div className="flex items-center gap-1 text-sm">
          {units[0] ? (
            <span className="px-2 py-0.5 rounded-full border text-xs">
              {units[0].unitName}
            </span>
          ) : (
            "-"
          )}
          {units.length > 1 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-xs text-muted-foreground">
                    +{units.length - 1}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="space-y-1">
                  {units.slice(1).map((u, i) => (
                    <div key={i} className="text-xs">
                      {u.unitName}
                    </div>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    id: "wareHouses",
    header: "Assigned Warehouse",
    enableHiding: !seller,
    cell: ({ row }) => {
      const wh = row.original?.wareHouses || [];
      return (
        <div className="flex items-center gap-1 text-sm">
          {wh[0] ? (
            <span className="px-2 py-0.5 rounded-full border text-xs">
              {wh[0].wareHouseName}
            </span>
          ) : (
            "-"
          )}
          {wh.length > 1 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-xs text-muted-foreground">
                    +{wh.length - 1}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="space-y-1">
                  {wh.slice(1).map((w, i) => (
                    <div key={i} className="text-xs">
                      {w.wareHouseName}
                    </div>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    id: "addressFor",
    header: "",
    cell: ({ row }) => {
      const addr = row.original?.addressId;
      return (
        <div className="flex flex-col justify-evenly h-[90px] text-primary text-xs">
          {addr?.regAddress && <span>Registered</span>}
          {addr?.isBilling && <span>Billing</span>}
          {addr?.isShipping && <span>Shipping</span>}
        </div>
      );
    },
  },
];
      console.log(branchData);
  // const paginatedData = branchData.slice(
  //   pagination.pageIndex * pagination.pageSize,
  //   (pagination.pageIndex + 1) * pagination.pageSize
  // );
 
    // console.log(paginatedData);
  const handlePrevious = () => {
     
       setPage((prev) => prev - 1);
  };

  const handleNext = () => {
  
    setPage((prev) => prev + 1);
  };
  return(
    <>
       <DashboardTable
        data={branchData}
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
    </>
  )
}
export default SettingCompanyBranch;