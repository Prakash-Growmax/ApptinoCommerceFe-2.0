import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import TimelineItem from "./timeline";

function InfoRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-muted-foreground uppercase">{label}</div>
      <div className="text-sm text-black">{value}</div>
    </div>
  )
}


function Details() {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow label="Customer Name" value="Acme Corporation" />
          <InfoRow label="Contact Person" value="J  ames Wilson" />
          <InfoRow
            label="Phone"
            value={
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (555) 123-4567
              </div>
            }
          />
          <InfoRow
            label="Email"
            value={
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                j.wilson@acmecorp.com
              </div>
            }
          />
          <InfoRow
            label="Service Address"
            value={
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <div>
                  123 Business Park Dr. <br />
                  Suite 400 <br />
                  San Francisco, CA 94107
                </div>
              </div>
            }
          />
        </CardContent>
      </Card>

      {/* <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entitlement Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow label="Service Plan" value="Premium Plan" />
          <InfoRow label="Valid Period" value="Jan 1, 2024 - Dec 31, 2024" />
          <InfoRow label="Visits Allowed" value="5" />
          <InfoRow label="Is Chargeable" value="No" />
          <InfoRow label="Special Terms" value="24/7 support included" />
        </CardContent>
      </Card> */}

      <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TimelineItem
          title="Technician Check-in"
          date="Today, 10:05 AM"
          description="Mike Johnson has arrived on site"
          isActive
        />
        <TimelineItem
          title="Visit Scheduled"
          date="Yesterday, 4:32 PM"
          description="Follow-up visit scheduled with Mike Johnson"
        />
        <TimelineItem
          title="Initial Visit Completed"
          date="May 1, 2025, 4:45 PM"
          description="Sarah Williams completed the initial diagnosis"
        />
        <TimelineItem
          title="Ticket Created"
          date="May 1, 2025, 9:24 AM"
          description="Ticket created by James Wilson (Customer)"
        />
        <TimelineItem
          title="Customer Contract Verified"
          date="May 1, 2025, 9:30 AM"
          description="Service entitlement confirmed under PMC"
        />
      </CardContent>
    </Card>
    </div>
  )
}

export default Details
