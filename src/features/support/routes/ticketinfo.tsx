import React from "react";

interface TicketInfoProps {
  ticketId: string;
  createdAt: string;
}

export const TicketInfo: React.FC<TicketInfoProps> = ({ ticketId, createdAt }) => {

  return (
    <div className="text-sm text-muted-foreground flex items-center gap-4 ">
      <span className="font-medium text-foreground">#{ticketId}</span>
      <span className="text-xs lg:text-sm">Created: {new Date(createdAt).toLocaleString()}</span>
    </div>
  );
};
