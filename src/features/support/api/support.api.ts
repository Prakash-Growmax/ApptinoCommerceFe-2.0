import { apiGet, apiPost, apiPut } from '@/lib/api/client';

import { ParsedPropertyList } from '../schema/support.schema';
import { SupportTicketResponse } from '../schema/suppot.ticket';
import { SupportInfo } from '../types/support.types';

export const GetSupportFilter = async ({
  userId,
  tenantId,
}: SupportInfo): Promise<ParsedPropertyList> => {
  const response = await apiGet<ParsedPropertyList>(
    `/corecommerce/templates/get?domainName=${tenantId}&propertyName=886_filters`,
    { tenantId }
  );
  return response;
};
export const GetFetchSupportTicket = async ({
  tenantId,
  page,
  rowPerPage,
  body,
}: SupportInfo): Promise<SupportTicketResponse> => {
  const response = await apiPost<SupportTicketResponse>(
    `/support/service-support/filter?domainName=${tenantId}&page=${page}&size=${rowPerPage}`,
    body,
    { tenantId }
  );
  return response;
};

//Get Support Ticket Details
export const getSupportTicketDetails = async (
  domainName: string,
  ticketIdentifier: string
) => {
  const response = await apiGet({
    url: '/support/service-support/get',
    params: {
      domainName,
      ticketIdentifier,
    },
  });
  return response;
};

//Get Support Ticket Field Services
export const getSupportTicketFieldServices = async (
  domainName: string,
  ticketIdentifier: string
) => {
  const response = await apiGet({
    url: 'support/service-support/fieldService/getAllFieldServices',
    params: {
      domainName,
      ticketIdentifier,
    },
  });
  return response;
};

//Get Support Ticket Timeline
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
export const getSupportTicketStatus = async (
  tenantId: string
) => {
  const response = await apiGet(
    `/corecommerce/templates/get?domainName=${tenantId}&propertyName=ticketSettings`,
    { tenantId }
  );
  return response;
};
export const getSupportFieldServiceRep = async (
  tenantId: string,
  companyId: number
) => {
  const response = await apiGet(
    `/corecommerce/userses/getAllUsersByCompanyIdNew?companyId=${companyId}`,
    { tenantId }
  );
  return response;
};
export const createFieldService = async (
  tenantId: string,
  payload: any
) => {
  const response = await apiPost(
    `/support/service-support/fieldService/create?domainName=${tenantId}`,
    payload,
    { tenantId }
  );
  return response;
};
export const postFieldNotes = async (tenantId: string, body: any) => {
  const response = await apiPost(
    `/support/service-support/fieldService/notes/add`,
    body,
    { tenantId }
  );
  return response;
};
export const postFieldAttachments = async (
  tenantId: string,
  ticketId: string,
  fsId: string,
  body: any
) => {
  const response = await apiPost(
    `/support/service-support/fieldService/addAttachments?domainName=${tenantId}&ticketIdentifier=${ticketId}&fieldServiceIdentifier=${fsId}`,
    body,
    { tenantId }
  );
  return response;
};
export const createTicketss = async (
  tenantId: string,
  payload: any
) => {
  const response = await apiPost(
    `/support/service-support/fieldService/createWithSupportTicket?domainName=${tenantId}`,
    payload,
    { tenantId }
  );
  return response;
};
export const updateTicket = async (
  tenantId: string,
  payload: any
) => {
  const response = await apiPost(
    `/support/service-support/update`,
    payload,
    { tenantId }
  );
  return response;
};
export const updateTicketServices = async (
  tenantId: string,
  payload: any
) => {
  const response = await apiPut(
    `/support/service-support/fieldService/update?domainName=${tenantId}`,
    payload,
    { tenantId }
  );
  return response;
};
