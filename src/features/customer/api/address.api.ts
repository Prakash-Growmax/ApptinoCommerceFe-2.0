import { apiGet } from "@/lib/api/client";
import { AddressDetailsType } from "../schema/address.schema";

export const GetAddressDetails = async ({
  companyId,
  tenantId,
  token,
  page,
  rowPerPage
}: {
  companyId: string;
  tenantId: string;
  token: string;
  page:number,
  rowPerPage:number
}): Promise<AddressDetailsType> => {
  const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };

  const response = await apiGet<AddressDetailsType>({
    url: `/corecommerce/accountses/getAddressDetails?companyId=${companyId}&offset=${page}&limit=${rowPerPage}&searchString=`,
    config: { headers },
  });

  return response;
};














