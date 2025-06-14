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
          
          <ShadCnButton variant="default" className="w-full sm:w-auto h-[30px] text-sm">
            + Add Service Visit
          </ShadCnButton>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            name="title"
            label="Title"
            placeholder="Title"
            value={fieldService.title}
            className="text-gray-700"
          />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect
            name="Status"
            label="Status"
            className="text-gray-700"
            options={[
              { value: fieldService?.status, label: fieldService?.status }
            ]}
          />
          <FormInput
            name="Category"
            label="Category"
            className="text-gray-700"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

        <div className="w-full">
          <FormTextarea
            name="Customer Address"
            label="Customer Address"
            className="text-gray-700"
            value={(fieldService?.location ?? "").replace(/, /g, '\n')}
          />
        </div>

  <TooltipProvider>
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
            className="flex items-start sm:items-center space-x-3 text-sm text-gray-700 bg-gray-100 rounded px-4 py-2 w-full shadow-sm cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-gray-500 mt-1 sm:mt-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L13 1.586A2 2 0 0011.586 1H4z" />
            </svg>
            <div>
              <div className="text-blue-600 font-medium">
                {attachment.fileName}
              </div>
              <div className="text-gray-500 text-xs">
                Attached by {attachment.attachedByUsername} · {formatted}
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
</TooltipProvider>


      </CardContent>
    </Card>
  );
};

export default VisitDetails;
