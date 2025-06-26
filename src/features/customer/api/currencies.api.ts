import { apiGet } from "@/lib/api/client";

export type CurrencyType = {
  currencyCode: string;
  decimal: string;
  description: string;
  id: number;
  precision: number;
  symbol: string;
  tenantId: number;
  thousand: string;
};

export const getCurrencies = async ({
  token,
  tenantId,
}: {
  token: string;
  tenantId: string | number;
}): Promise<CurrencyType[]> => {
  const headers = {
    "Content-Type": "application/json",
    "x-tenant": tenantId,
    Authorization: `Bearer ${token}`,
  };

  const response = await apiGet<{ data: CurrencyType[] }>({
    url: "/corecommerce/currency",
    config: { headers },
  });



      return response;
  // return response.data?? []
};
