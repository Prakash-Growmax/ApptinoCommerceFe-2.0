// import { Card, CardHeader, CardTitle } from "@/components/ui/card"



// function Serviceheader(){

//     return(
//         <div>
//            <Card>
//             <CardHeader>
                 
//         <CardTitle>#TCKT-001234</CardTitle>
//         <CardTitle>C</CardTitle>
//             </CardHeader>
        
//            </Card>
//         </div>
//     )

// }

// export default Serviceheader

    import { Card, CardHeader } from "@/components/ui/card";
import { TicketInfo } from "./ticketinfo";

export default function TicketHeader() {
  return (
    <div className="p-3">
        <Card>
            <CardHeader>

         <TicketInfo ticketId="TCKT-001234" createdAt="Oct 03, 1999  09:24 AM" />
            </CardHeader>
        </Card>
    </div>
  );
}
