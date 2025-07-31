import { apiPost } from '@/lib/api/ticket';

import {
  CreateTicketRequestType,
  CreateTicketResponseType,
} from './tickettype';

export const createTicket = async ({
  body,
  token,
  tenantId,
}: {
  body: CreateTicketRequestType;
  token: string;
  tenantId: string;
}): Promise<CreateTicketResponseType> => {
  const response = await apiPost<CreateTicketResponseType>({
    url: `/support/service-support/fieldService/createWithSupportTicket?domainName=${tenantId}`,
    data: body,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return response;
};
