import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useGetAddressDetails } from "../hook/usegetaddress"; 
import CustomerDetail from "./address.landing";

const AddressComponent = () => {
  const { id } = useParams<{ id: string }>();

  const { addressData, isLoading, isError } = useGetAddressDetails(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !addressData) return <p>No address data found.</p>;

  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading Customer Detail...</div>}>
        {/* <CustomerDetail addressData={addressData} /> */}
        
        <CustomerDetail addressData={addressData ? [addressData] : []} />
        
        

      </Suspense>
    </div>
  );
};

export default AddressComponent;





















// import { Suspense, useEffect, useState } from "react";
// import { GetAddressDetails } from "../api/address.api";
// import { AddressDetailsType } from "../schema/address.schema"; 
// import { useGetCompanyDetails } from "@/features/settings/hook/useGetCompanyDetaiLs"; // assume this is valid
// import { useParams } from "react-router-dom";
// import useAppStore from "@/stores/appStore";
// import { TokenPayload } from "@/types/auth.types";
//   import { ColumnDef } from "@tanstack/react-table";
// import CustomerDetail from "./address.landing";



  

// const AddressComponent = () => {
//   const [addressData, setAddressData] = useState<AddressDetailsType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();

//    const { accessToken, payload } = useAppStore();
//     const token = accessToken as string;
//     const {tenantId ,companyId,displayName,companyName,userId} = payload as TokenPayload;

//   useEffect(() => {
    
//     const loadAddressDetails = async () => {
//       try {
//         const response = await GetAddressDetails({
//           companyId: id,
//           tenantId, // 🔁 Replace with real value
//           token  // 🔁 Replace with real value
//         });
//         console.log(response);
        
//         setAddressData(response);
        
//       } catch (error) {
//         console.error("Failed to fetch address details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAddressDetails();
//   }, [tenantId, token]);

//   if (loading) return <p>Loading...</p>;
//   if (!addressData) return <p>No data found.</p>;






//   return (
//     <div className="p-4">
//       {/* <h2 className="text-xl font-semibold mb-2">Address Details</h2> */}
//       {/* <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-[400px]">
//         {JSON.stringify(addressData, null, 2)}
//       </pre> */}
//       <Suspense fallback={<div>Loading Customer Detail...</div>}>
//         <CustomerDetail addressData={addressData} />
//       </Suspense>
//     </div>
//   );
// };

// export default AddressComponent;



