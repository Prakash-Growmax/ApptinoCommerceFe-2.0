import { Card, CardHeader } from "@/components/ui/card";
  import { TicketInfo } from "./ticketinfo";
  import { useFormContext } from "react-hook-form";

  export default function TicketHeader() {
    const { watch } = useFormContext();
      const supportTicketData = watch("supportTicketData") ?? [];

      const {ticketIdentifier, createdDateTime} =supportTicketData
      
    return (
      <div className=" mb-3  lg:mx-4">
          <Card>
              <CardHeader>

          <TicketInfo ticketId={ticketIdentifier} createdAt={createdDateTime} />
              </CardHeader>
          </Card>
      </div>
    );
  }
















//   import { Card, CardHeader } from "@/components/ui/card";
// import { TicketInfo } from "./ticketinfo";
// import { useFormContext } from "react-hook-form";
// import { format } from "date-fns";

// export default function TicketHeader() {
//   const { watch } = useFormContext();
//   const supportTicketData = watch("supportTicketData");

//   // Destructure values safely
//   const ticketId = supportTicketData?.ticketIdentifier || "N/A";
//   const createdAtRaw = supportTicketData?.createdDateTime;

//   // Format date to something like: "Jun 13, 2025 05:17 PM"
//   const formattedCreatedAt = createdAtRaw
//     ? format(new Date(createdAtRaw), "MMM dd, yyyy  hh:mm a")
//     : "Unknown Date";

//   return (
//     <div className="p-3">
//       <Card>
//         <CardHeader>
//           <TicketInfo ticketId={ticketId} createdAt={formattedCreatedAt} />
//         </CardHeader>
//       </Card>
//     </div>
//   );
// }

