import { useFormContext } from 'react-hook-form';
import { ShadCnButton } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VisitDetails from './VisitDetails';
import { Wrench } from 'lucide-react';
import { useState } from 'react';
import EditDialog from '@/components/molecules/EditDialog/EditDialog';
import CreateFieldService from '../components/CreateFieldService';



const ServiceVisits = () => {
  const { watch } = useFormContext();
  const fieldServicesData = watch('fieldServicesData') ?? [];
  const [open, setOpen] = useState(false);



  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base sm:text-lg">Service Visits</CardTitle>
          <ShadCnButton
            variant="default"
            className="w-full sm:w-auto h-[36px] text-sm flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <Wrench className="w-4 h-4" />
            Add Service Visit
          </ShadCnButton>
        </CardHeader>
        <CardContent className="space-y-4">
          {fieldServicesData.map((fieldService, index) => (
            <VisitDetails key={index} fieldService={fieldService} />
          ))}
        </CardContent>
      </Card>

      <CreateFieldService open={open} setOpen={setOpen} />
    </div>
  );
};

export default ServiceVisits;
