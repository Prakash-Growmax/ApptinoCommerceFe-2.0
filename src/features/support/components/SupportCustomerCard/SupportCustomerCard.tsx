import { Mail, MapPin, Phone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetSupportTicketFieldServices } from '../../hook/useGetSupportTicketFieldServices';

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

function SupportCustomerCard() {
  const { data, isLoading, error, refetch } = useGetSupportTicketFieldServices(
    'dev3',
    'ST0071'
  );
  // const { data, isLoading, error, refetch } = useGetSupportTicketDetails(
  //   'dev3',
  //   'ST0071'
  // );
  console.log('🚀 ~ SupportCustomerCard ~ data:', isLoading, data);

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
    </div>
  );
}

export default SupportCustomerCard;
