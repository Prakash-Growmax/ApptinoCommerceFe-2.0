import { apiGet, apiPost, apiPut } from '@/lib/api/client';

import { ParsedPropertyList } from '../schema/support.schema';
import { SupportTicketResponse } from '../schema/suppot.ticket';
import { SupportInfo } from '../types/support.types';

export const GetSupportFilter = async ({
  userId,
  tenantId,
}: SupportInfo): Promise<ParsedPropertyList> => {
  const response = await apiGet<ParsedPropertyList>({
    url: `/corecommerce/templates/get?domainName=${tenantId}&propertyName=886_filters`
  });
  return response;
};
export const GetFetchSupportTicket = async ({
  tenantId,
  page,
  rowPerPage,
  body,
}: SupportInfo): Promise<SupportTicketResponse> => {
  const response = await apiPost<SupportTicketResponse>({
    url: `/support/service-support/filter?domainName=${tenantId}&page=${page}&size=${rowPerPage}`,
    data: body
  });
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
  const response = await apiGet({
    url: `/corecommerce/templates/get?domainName=${tenantId}&propertyName=ticketSettings`
  });
  return response;
};
export const getSupportFieldServiceRep = async (
  tenantId: string,
  companyId: number
) => {
  const response = await apiGet({
    url: `/corecommerce/userses/getAllUsersByCompanyIdNew?companyId=${companyId}`
  });
  return response;
};
export const createFieldService = async (
  tenantId: string,
  payload: any
) => {
  const response = await apiPost({
    url: `/support/service-support/fieldService/create?domainName=${tenantId}`,
    data: payload
  });
  return response;
};
export const postFieldNotes = async (tenantId: string, body: any) => {
  const response = await apiPost({
    url: `/support/service-support/fieldService/notes/add`,
    data: body
  });
  return response;
};
export const postFieldAttachments = async (
  tenantId: string,
  ticketId: string,
  fsId: string,
  body: any
) => {
  const response = await apiPost({
    url: `/support/service-support/fieldService/addAttachments?domainName=${tenantId}&ticketIdentifier=${ticketId}&fieldServiceIdentifier=${fsId}`,
    data: body
  });
  return response;
};
export const createTicketss = async (
  tenantId: string,
  payload: any
) => {
  const response = await apiPost({
    url: `/support/service-support/fieldService/createWithSupportTicket?domainName=${tenantId}`,
    data: payload
  });
  return response;
};
export const updateTicket = async (
  tenantId: string,
  payload: any
) => {
  const response = await apiPost({
    url: `/support/service-support/update`,
    data: payload
  });
  return response;
};
export const updateTicketServices = async (
  tenantId: string,
  payload: any
) => {
  const response = await apiPut({
    url: `/support/service-support/fieldService/update?domainName=${tenantId}`,
    data: payload
  });
  return response;
};
