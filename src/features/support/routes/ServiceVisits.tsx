import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import VisitDetails from './VisitDetails';

const ServiceVisits = () => {
  const { watch } = useFormContext();
  const fieldServicesData = watch('fieldServicesData') ?? [];

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Service Visits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fieldServicesData?.map((fieldService, index) => (
            <VisitDetails key={index} fieldService={fieldService} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default ServiceVisits;
