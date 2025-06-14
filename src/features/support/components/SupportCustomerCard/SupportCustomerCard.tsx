

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetSupportTicketFieldServices } from '../../hook/useGetSupportTicketFieldServices';
import { useFormContext } from 'react-hook-form';
import { Mail, Phone } from 'lucide-react';

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
  const { watch } = useFormContext();
  const supportTicketData = watch("supportTicketData");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Customer Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow label="Customer Name" value={supportTicketData?.buyerCompanyName ? supportTicketData?.buyerCompanyName : "_"} />
        <InfoRow label="Contact Person" value={supportTicketData?.buyerContactPerson ? supportTicketData?.buyerContactPerson : "_"} />
        <InfoRow
          label="Phone"
          value={
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {supportTicketData?.buyerContactNumber ? supportTicketData?.buyerContactNumber : "_" }
            </div>
          }
        />
        <InfoRow
          label="Email"
          value={
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {supportTicketData?.buyerEmail ? supportTicketData?.buyerEmail : "_" }
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
