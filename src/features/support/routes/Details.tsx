import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

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

      <Card className="w-full max-w-sm">
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
      </Card>
    </div>
  )
}

export default Details
