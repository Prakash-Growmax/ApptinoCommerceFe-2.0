import { apiGet, apiPost } from '@/lib/api/client';

import { ParsedPropertyList } from '../schema/support.schema';
import { SupportTicketResponse } from '../schema/suppot.ticket';
import { SupportInfo } from '../types/support.types';

export const GetSupportFilter = async ({
  userId,
  tenantId,
  token,
}: SupportInfo): Promise<ParsedPropertyList> => {
  const headers = {
    'Content-Type': 'application/json',
    'x-tenant': tenantId,
    Authorization: `Bearer ${token}`,
  };
  const response = await apiGet<ParsedPropertyList>({
    url: `/corecommerce/templates/get?domainName=dev3&propertyName=${userId}_filters`,
    config: {
      headers,
    },
  });
  return response;
};
export const GetFetchSupportTicket = async ({
  tenantId,
  page,
  rowPerPage,
  body,
  token,
}: SupportInfo): Promise<SupportTicketResponse> => {
  const headers = {
    'Content-Type': 'application/json',
    'x-tenant': tenantId,
    Authorization: `Bearer ${token}`,
  };
  const response = await apiPost<SupportTicketResponse>({
    url: `/support/service-support/filter?domainName=${tenantId}&page=${page}&size=${rowPerPage}`,
    data: body,
    config: {
      headers,
    },
  });
  return response;
};

export const getSupportTimeline = async (
  domainName: string,
  ticketIdentifier: string
) => {
  const response = await apiGet({
    url: '/support/service-support/audit/getByDomainAndTicketIdentifier',
    params: {
      domainName,
      ticketIdentifier,
    },
  });
  return response;
};
