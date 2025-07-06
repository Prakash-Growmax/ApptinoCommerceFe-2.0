
    import {
  CreateTicketRequestType,
  CreateTicketResponseType,
} from './tickettype';
import { apiPost } from '@/lib/api/ticket';

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
    token,
    tenantId,
  });

  return response;
};















// import {
//   CreateTicketRequestType,
//   CreateTicketResponseType,
// } from './tickettype';
// import { apiPost } from '@/lib/api/ticket';

// export const createTicket = async ({
//   body,
//   token,
//   tenantId,
// }: {
//   body: CreateTicketRequestType;
//   token: string;
//   tenantId: string;
// }): Promise<CreateTicketResponseType> => {
//   const response = await apiPost<CreateTicketResponseType>({
//     url: '/support/service-support/fieldService/createWithSupportTicket?domainName=dev3',
//     data: body,
//     token,
//     tenantId,
//   });

//   return response;
// };
