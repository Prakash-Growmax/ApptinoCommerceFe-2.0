

    import {
    CreateTicketRequestType,
    CreateTicketResponseType,
    } from './tickettype';
    import { apiPost } from '@/lib/api/ticket';

    export const createTicket = async (
    body: CreateTicketRequestType,
    token: string,
    tenantId: string
    
    ): Promise<CreateTicketResponseType> => {
    return apiPost<CreateTicketResponseType>({
        url: '/support/service-support/fieldService/createWithSupportTicket?domainName=dev3',
        data: body,
        token,
        tenantId,
    });
    };

//     import {
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
//   const headers = {
//     'Content-Type': 'application/json',
//     'x-tenant': tenantId,
//     Authorization: `Bearer ${token}`, // ✅ Fix formatting
//   };

//   const response = await apiPost<CreateTicketResponseType>({
//     url: '/support/service-support/fieldService/createWithSupportTicket?domainName=dev3',
//     data: body,
//     config: {
//       headers,
//     },
//   });

//   return response;
// };



// import { apiPost } from '@/lib/api/client';
// import {
//   CreateTicketRequestType,
//   CreateTicketResponseType,
// } from './tickettype';

// export const createTicket = async (
//   body: CreateTicketRequestType,
//   token: string,
//   tenantId: string
// ): Promise<CreateTicketResponseType> => {
//   return apiPost<CreateTicketResponseType>({
//     url: '/support/service-support/fieldService/createWithSupportTicket?domainName=dev3',
//     data: body,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'x-tenant-id': tenantId,
//     },
//   });
// };
