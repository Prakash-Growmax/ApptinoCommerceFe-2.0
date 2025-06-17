import { useFormContext } from 'react-hook-form';
import { ShadCnButton } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import VisitDetails from './VisitDetails';
import { Wrench } from 'lucide-react';
import { useState } from 'react';
import CreateFieldService from '../components/CreateFieldService';

const ServiceVisits = () => {
  const { watch } = useFormContext();
  const fieldServicesData = watch('fieldServicesData') ?? [];
  const [open, setOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    const formatDate = new Date(date);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return formatDate.toLocaleString("en-GB", options);
  };

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

        <CardContent className="pb-4">
          {fieldServicesData.length > 0 ? (
            <Accordion type="multiple" className="w-full space-y-3">
              {fieldServicesData.map((fieldService, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border rounded-md px-4 overflow-visible"
                >
                  <AccordionTrigger className="hover:no-underline py-3">
                    <div className="w-full text-left">
                      <div className="text-sm font-semibold">{fieldService?.identifier}</div>
                      <div className="text-sm font-medium text-gray-600 mt-1">
                        {fieldService?.title}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-4 gap-y-1 mt-2">
                        <span className="text-xs text-gray-500">
                          created on: {formatDate(fieldService?.createdDateTime)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Appointment: {formatDate(fieldService?.appointmentFromDateTime)} - {formatDate(fieldService?.appointmentToDateTime)}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <VisitDetails fieldService={fieldService} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-sm text-muted-foreground">No service visits added yet.</p>
          )}
        </CardContent>
      </Card>

      <CreateFieldService open={open} setOpen={setOpen} />
    </div>
  );
};

export default ServiceVisits;