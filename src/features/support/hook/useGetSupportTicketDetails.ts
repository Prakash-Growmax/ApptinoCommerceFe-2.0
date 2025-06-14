import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { getSupportTicketDetails } from '../api/support.api';

export const useGetSupportTicketDetails = (
  domainName: string,
  ticketIdentifier: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    staleTime?: number;
    gcTime?: number;
  }
): UseQueryResult => {
  const queryOptions: any = {
    queryKey: ['supportTicketDetails', domainName, ticketIdentifier],
    queryFn: () => getSupportTicketDetails(domainName, ticketIdentifier),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options?.gcTime ?? 10 * 60 * 1000, // 10 minutes
    retry: 3,
  };

  // Only add refetchInterval if it's defined
  if (options?.refetchInterval !== undefined) {
    queryOptions.refetchInterval = options.refetchInterval;
  }

  return useQuery(queryOptions);
};
