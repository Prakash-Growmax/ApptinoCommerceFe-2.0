// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import TimelineItem from "../../routes/timeline";
// // import { useSupportTimeline } from "../../hook/useGetSupportTimeline";

// function SupportTimeline() {

  
  
//   return (

//     <div>
//      <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle>Activity Timeline</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <TimelineItem
//           title="Technician Check-in"
//           date="Today, 10:05 AM"
//           description="Mike Johnson has arrived on site"
//           isActive
//         />
//         <TimelineItem
//           title="Visit Scheduled"
//           date="Yesterday, 4:32 PM"
//           description="Follow-up visit scheduled with Mike Johnson"
//         />
//         <TimelineItem
//           title="Initial Visit Completed"
//           date="May 1, 2025, 4:45 PM"
//           description="Sarah Williams completed the initial diagnosis"
//         />
//         <TimelineItem
//           title="Ticket Created"
//           date="May 1, 2025, 9:24 AM"
//           description="Ticket created by James Wilson (Customer)"
//         />
//         <TimelineItem
//           title="Customer Contract Verified"
//           date="May 1, 2025, 9:30 AM"
//           description="Service entitlement confirmed under PMC"
//           />
//       </CardContent>
//     </Card>
//   </div>
       
//         )};

// export default SupportTimeline;


// src/features/support/components/SupportTimeline/SupportTimeline.tsx

// // src/features/support/components/SupportTimeline/SupportTimeline.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimelineItem from "../../routes/timeline";
import { useFormContext } from "react-hook-form";

type Change = {
  attributeName: string;
  newValue: string;
  oldValue: string;
};

type TimelineItemType = {
  changes: Change[];
  updatedByUserId: number;
  updatedByUsername: string | null;
  updatedDateTime: string;
};

export default function SupportTimeline() {
const { watch } = useFormContext();
  const ticketTimelineData = watch("ticketTimelineData") ?? [];
  console.log(ticketTimelineData);
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 mt-8">
          {ticketTimelineData?.map((entry, index) => {
            const change = entry.changes?.[0];
            return (
              <TimelineItem
                key={index}
                title={change?.attributeName ?? "Change"}
                date={new Date(entry.updatedDateTime).toLocaleString()}
                description={`Changed from "${change?.oldValue}" to "${change?.newValue}" by ${
                  entry.updatedByUsername ?? `user ID ${entry.updatedByUserId}`
                }`}
                isActive={index === 0}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

