import { FormInput, FormSelect, FormTextarea } from "@/components/molecules/ReactHookForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ShadCnButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import VisitDetailTable from "./VisitDetailTable";
import { FormCalendar } from "@/components/molecules/ReactHookForm/Calendar/Calendar";
import { FormField } from "@/components/molecules/ReactHookForm/FormField/FormField";
import { formatDateTime } from "@/utils/component/dataconverter";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const VisitDetails = ({ fieldService }) => {
  const [category, setCategory] = useState(fieldService?.category ?? "");

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm">{fieldService?.identifier}</CardTitle>
            <Badge variant="outline">{fieldService.status}</Badge>
          </div>
          
      
        </div>
      </CardHeader>

        <CardContent>
     
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FormInput
            name="title"
            label="Title"
            placeholder="Title"
            value={fieldService.title}
            className="text-gray-700"
          />
               <FormSelect
            name="Service Representative"
            label="Service Representative"
            className="text-gray-700"
            options={[
              { value: fieldService?.ownerUsername, label: fieldService?.ownerUsername }
            ]}
          />
          </div>

        {/* Appointment dates - Single row with 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            name="Appointment Date From"
            label="Appointment Date From"
            className="text-gray-700"
          >
            {({ field }) => (
              <FormCalendar value={fieldService?.appointmentFromDateTime ?? ""} onChange={field.onChange} />
            )}
          </FormField>
          <FormField
            name="Appointment Date To"
            label="Appointment Date To"
            className="text-gray-700"
          >
            {({ field }) => (
              <FormCalendar value={fieldService?.appointmentToDateTime ?? ""} onChange={field.onChange} />
            )}
          </FormField>
        </div>

        {/* Status and Category - Single row with 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormSelect
            name="category"
            label="Category"
            className="text-gray-700"
            options={[
              { value: fieldService?.category, label: fieldService?.category }
            ]}
          />
           
          <FormSelect
            name="Status"
            label="Status"
            className="text-gray-700"
            options={[
              { value: fieldService?.status, label: fieldService?.status }
            ]}
          />
       
        </div>

     

        <div className="w-full">
          <FormTextarea
            name="Customer Address"
            label="Customer Address"
            className="text-gray-700"
            value={(fieldService?.location ?? "").replace(/, /g, '\n')}
          />
        </div>

        {fieldService?.attachments && fieldService.attachments.length > 0 && (
          <div className="space-y-3">
            <TooltipProvider>
              <div className="space-y-2">
                {fieldService?.attachments?.map((attachment) => {
                  const formatted = formatDateTime(attachment.uploadedDateTime);
                  return (
                    <Tooltip key={attachment.identifier}>
                      <TooltipTrigger asChild>
                        <a
                          href={attachment.attachmentUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start space-x-3 p-3 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm cursor-pointer transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L13 1.586A2 2 0 0011.586 1H4z" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <div className="text-blue-600 font-medium truncate">
                              {attachment.fileName}
                            </div>
                            <div className="text-gray-500 text-xs mt-1">
                              <span className="block sm:inline">
                                Attached by {attachment.attachedByUsername}
                              </span>
                              <span className="hidden sm:inline"> · </span>
                              <span className="block sm:inline text-gray-400">
                                {formatted}
                              </span>
                            </div>
                          </div>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to download attachment</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitDetails;
