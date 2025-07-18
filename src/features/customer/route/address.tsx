import { useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { InfoCard } from "@/components/molecules/InfoCard";
import { useGetAddressDetails } from "../hook/useGetaddress"; 
import CustomerDetail from "./address.landing";

const AddressComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(0);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const { addressData, isLoading, isError } = useGetAddressDetails(id, page, rowPerPage);

  return (
    <InfoCard
      title="Addresses"
      icon={MapPin}
      collapsible={true}
      defaultCollapsed={false}
      className='w-[930px]'
    >
      <CustomerDetail 
        addressData={addressData?.data?.addressTags ?? []} 
        page={page} 
        setPage={setPage} 
        rowPerPage={rowPerPage} 
        setRowPerPage={setRowPerPage} 
        loading={isLoading} 
        totalCount={addressData?.data?.totalCount}
        
      />
    </InfoCard>
  );
};

export default AddressComponent;





















