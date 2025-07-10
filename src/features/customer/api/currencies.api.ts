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
  tenantId,
}: {
  tenantId: string | number;
}): Promise<CurrencyType[]> => {
  const response = await apiGet<{ data: CurrencyType[] }>({
    url: "/corecommerce/currency"
  });

  return response.data ?? [];
};
