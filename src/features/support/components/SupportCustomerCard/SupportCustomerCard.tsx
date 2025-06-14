

import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupportTimeline } from "../../hook/useGetSupportTimeline";
import { useLocation } from "react-router-dom";
import SupportTimeline from "../SupportTimeline/SupportTimeline";

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-muted-foreground uppercase">
        {label}
      </div>
      <div className="text-sm text-black">{value}</div>
    </div>
  );
}

export default function SupportCustomerCard() {
  const location = useLocation();
  const parts = location.pathname.replace(/\/$/, "").split("/");
  const ticketId = parts.pop() ?? "";

  const { data, isLoading, error } = useSupportTimeline("dev3", ticketId);

  console.log(data);
  

  return (
    <div className="space-y-6">
      {/* Customer Info Card */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow label="Customer Name" value="Acme Corporation" />
          <InfoRow label="Contact Person" value="James Wilson" />
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

      {/* Timeline Section */}
      <div className="mt-6">
  {!ticketId ? (
  <p className="text-red-600">Invalid ticket ID</p>
) : isLoading ? (
  <p>Loading timeline...</p>
) : error ? (
  <p className="text-red-600">Error loading timeline.</p>
) : (
  <SupportTimeline data={data as TimelineItemType[]} />
)}
</div>
    </div>
  );
}
