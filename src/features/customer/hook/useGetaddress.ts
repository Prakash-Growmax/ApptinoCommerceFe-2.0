
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








