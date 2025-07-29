
import { useFormContext } from 'react-hook-form';
import { ShadCnButton } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import VisitDetails from './VisitDetails';
import { Wrench } from 'lucide-react';
import { useState } from 'react';
import CreateFieldService from '../components/CreateFieldService';

const ServiceVisits = ({ refetchFieldData }) => {
  const { watch, setValue } = useFormContext(); // ✅ added setValue
  const fieldServicesData = watch('fieldServicesData') ?? [];
  const [open, setOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    const formatDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return formatDate.toLocaleString('en-GB', options);
  };

  return (
    <div className="w-full">
      <Card className="border border-gray-200 shadow-sm rounded-md">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-2">
          <CardTitle className="text-base sm:text-lg ml-2">Service Visits</CardTitle>

          <ShadCnButton
            variant="default"
            className="w-full sm:w-auto h-[36px] text-sm flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <Wrench className="w-4 h-4" />
            Add Service Visit
          </ShadCnButton>
        </CardHeader>
        <div className="h-px bg-gray-300 w-full p-0 mt-2" />

        <CardContent className="p-0">
          {fieldServicesData.length > 0 ? (
            <div className="lg:p-6 p-3 pb-6">
              <Accordion type="multiple" className="w-full">
                {fieldServicesData.map((fieldService, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className={`border border-gray-200 rounded-lg px-4 bg-white shadow-sm ${
                      index !== fieldServicesData.length - 1 ? 'mb-3' : ''
                    }`}
                  >
                    <AccordionTrigger className="hover:no-underline py-3 border-0">
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
                            Appointment: {formatDate(fieldService?.appointmentFromDateTime)} -{' '}
                            {formatDate(fieldService?.appointmentToDateTime)}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0 border-0">
                      <div className="border-t border-gray-100 pt-4">
                        <VisitDetails fieldService={fieldService} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-sm text-muted-foreground">No service visits added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateFieldService
        open={open}
        setOpen={setOpen}
        refetchFieldData={refetchFieldData}
        setFieldServicesInForm={(data) => setValue('fieldServicesData', data)} // ✅ Added line
      />
    </div>
  );
};

export default ServiceVisits;
