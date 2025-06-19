
import { useQuery } from "@tanstack/react-query";
import { GetAddressDetails } from "../api/address.api";
import { AddressDetailsType } from "../schema/address.schema";
import useAppStore from "@/stores/appStore";
import { TokenPayload } from "@/types/auth.types";

export const useGetAddressDetails = (companyIdFromUrl?: string,page:number,rowPerPage:number) => {
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { tenantId } = payload as TokenPayload;

  const isEnabled = !!tenantId && !!token && !!companyIdFromUrl;
 
  const query = useQuery<AddressDetailsType>({
    queryKey: ["addressDetails", companyIdFromUrl, tenantId,page,rowPerPage],
    queryFn: () =>
      GetAddressDetails({
        companyId: companyIdFromUrl!,
        tenantId,
        token,
        page,
        rowPerPage
      }),
    enabled: isEnabled,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    addressData: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};








// // src/features/customer/hook/useGetAddressDetails.ts
// import { useEffect, useState } from "react";
// import { GetAddressDetails } from "../api/address.api";
// import { AddressDetailsType } from "../types/address.type";

// export const useGetAddressDetails = ({
//   companyId,
//   tenantId,
//   token,
// }: {
//   companyId: string;
//   tenantId: string;
//   token: string;
// }) => {
//   const [addressData, setAddressData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await GetAddressDetails({ companyId, tenantId, token });
//         setAddressData(res.data.addressTags || []);
//       } catch (error) {
//         console.error("Failed to fetch address data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [ tenantId, token]);

//   return { addressData, loading };
// };