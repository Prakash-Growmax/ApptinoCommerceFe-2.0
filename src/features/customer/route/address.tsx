import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAddressDetails } from "../hook/useGetaddress"; 
import CustomerDetail from "./address.landing";

const AddressComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [page,setPage]=useState<number>(0);
  const [rowPerPage,setRowPerPage]=useState<number>(20);
  const { addressData, isLoading, isError } = useGetAddressDetails(id,page,rowPerPage);

 

  return (
    <div className="w-full">
    
        <CustomerDetail addressData={addressData?.data?.addressTags ?? []} page={page} setPage={setPage} rowPerPage={rowPerPage} setRowPerPage={setRowPerPage} loading={isLoading} totalCount={addressData?.data?.totalCount }/>
      
    </div>
  );
};

export default AddressComponent;





















