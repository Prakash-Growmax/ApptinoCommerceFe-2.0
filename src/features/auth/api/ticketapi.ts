// // ticketApi.ts
// import { apiPost } from '@lib/api/client';

// export type CreateTicketRequestType = {
//   title: string;
//   description?: string;
//   customerName: string;
//   branchName?: string;
//   priority: 'LOW' | 'MEDIUM' | 'HIGH';
//   dueDate?: string; // ISO format
// };

// export type CreateTicketResponseType = {
//   data: {
//     ticketId: string;
//     status: 'CREATED' | 'FAILED';
//   };
//   message: string;
// };

// export const createTicket = async (
//   body: CreateTicketRequestType
// ): Promise<CreateTicketResponseType> => {
//   const response = await apiPost<CreateTicketResponseType>({
//     url: '/support/routes/createticket',
//     data: body,
//   });
//   return response;
// };



// src/api/ticket.api.ts

import { apiPost } from '@/lib/api/client';
import {
  CreateTicketRequestType,
  CreateTicketResponseType,
} from './tickettype';

export const createTicket = async (
  body: CreateTicketRequestType,
  token: string,
  tenantId: string
): Promise<CreateTicketResponseType> => {
  return apiPost<CreateTicketResponseType>({
    url: '/support/service-support/fieldService/createWithSupportTicket?domainName=batademo',
    data: body,
    token,
    tenantId,
  });
};
