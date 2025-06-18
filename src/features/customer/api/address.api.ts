import { apiGet } from "@/lib/api/client";
import { AddressDetailsType } from "../schema/address.schema";

export const GetAddressDetails = async ({
  companyId,
  tenantId,
  token,
}: {
  companyId: string;
  tenantId: string;
  token: string;
}): Promise<AddressDetailsType> => {
  const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };

  const response = await apiGet<AddressDetailsType>({
    url: `/corecommerce/accountses/getAddressDetails?companyId=${companyId}&offset=0&limit=20&searchString=`,
    config: { headers },
  });

  return response;
};














