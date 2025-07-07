import { useQuery } from "@tanstack/react-query";
import { GetCompanyDetails } from "../api/settings.api";
import useAppStore from "@/stores/appStore";
import { TokenPayload } from "@/types/auth.types";
import { AccountResponse } from "../types/company.types";
import { settingsQueryKeys } from "../api/queries";

export const useGetCompanyDetails = () => {
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { companyId, tenantId } = payload as TokenPayload;

  return useQuery<AccountResponse>({
    queryKey: ['companyDetails', companyId],
    queryFn: () => GetCompanyDetails({ companyId, tenantId, token } as any),
    enabled: !!companyId && !!tenantId && typeof window !== "undefined",
    refetchOnWindowFocus: false,
  });
};