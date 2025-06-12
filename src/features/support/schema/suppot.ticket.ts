import { z } from "zod";

export const SupportTicketSchema = z.object({
  domainName: z.string(),
  updatedDateTime: z.string().datetime(),  // ISO format
  createdDateTime: z.string().datetime(),  // ISO format
  buyerCompanyName: z.string(),
  status: z.string(),
  priority: z.string(),
  resolution: z.string().nullable(),
  description: z.string(),
  ticketIdentifier: z.string(),
  reason: z.string(),
  title: z.string(),
  type: z.string().nullable(),
  dueDateTime: z.string().datetime(), // ISO format
  buyerContactPerson: z.string(),
  buyerEmail: z.string().email(),
  buyerContactNumber: z.string(),
  ownerDetails: z.any().nullable(), // Update if structure is known
  category: z.any().nullable(),     // Update if structure is known
  tags: z.any().nullable(),         // Update if structure is known
});

export const SupportTicketType=z.object({
    count:z.number().nullable(),
    result:z.array(SupportTicketSchema)
})
export type SupportTicketResponse = z.infer<typeof SupportTicketType>;