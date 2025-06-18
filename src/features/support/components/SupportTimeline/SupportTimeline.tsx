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
  const rawticketTimelineData = watch("ticketTimelineData") ?? [];


  const ticketTimelineData: TimelineItemType[] = [...rawticketTimelineData].sort(
    (a, b) => new Date(b.updatedDateTime).getTime() - new Date(a.updatedDateTime).getTime()
  );

  return (
    <>
    {Boolean(ticketTimelineData.length) && (
        <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 mt-8 ">
          {ticketTimelineData?.map((entry, index) => {
            const change = entry.changes?.[0];
            return (
              <TimelineItem
                key={index}
                title={change?.attributeName ?? "Change" }
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
    )}
    
    </>
  
  );
}

