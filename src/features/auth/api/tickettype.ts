// src/api/ticket.types.ts

export type CreateTicketRequestType = {
  supportTicketRequestDTO: {
    title: string;
    description?: string;
    buyerCompanyName: string;
    buyerBranchName?: string;
    buyerEmail: string;
    buyerContactNumber: string;
    buyerContactPerson: string;
    ticketOwner: string;
    dueDateTime?: string | null;
    productSKUs: string[];
    referenceIdentifiers: string[];
    serialNumbers: string[];
    descriptionError: string;
    priority: string;
    status: string;
    updatedDateTime: string;
    createdDateTime: string;
    updatedByUserId: number;
    updatedByUsername: string;
    createdByUserId: number;
    createdByUserName: string;
    createdByCompanyId: number;
    createdByCompanyName: string;
    resolution: string;
    domainName: string;
  };
  fieldServiceRequestDTO: {
    title: string;
    ticketIdentifier: string | null;
    ownerUserId: number;
    ownerUsername: string;
    status: string;
    location: string;
    appointmentFromDateTime: string;
    appointmentToDateTime: string;
    createdDateTime: string;
    updatedDateTime: string;
    createdByUserId: number;
    createdByUsername: string;
    updatedByUserId: number;
    updatedByUsername: string;
    attachments: unknown[];
  };
};

export type CreateTicketResponseType = {
  success: boolean;
  message?: string;
  data?: any; // Replace with the actual shape if available
};
