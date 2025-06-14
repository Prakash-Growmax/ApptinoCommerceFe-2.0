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

const VisitDetails = ({ fieldService }) => {
  const today = new Date();
const [category, setCategory] = useState(fieldService?.category ?? "");
  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const methods = useForm({
    defaultValues: {
      name: "",
      website: "",
      taxId: "",
      businessType: "",
      accountType: "",
      defaultCurrency: "",
      subIndustry: "",
      industryDescription: "",
    },
  });

  return (
    <div>
      <Card className="w-full max-w-4xl mx-auto mb-6">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Left: Visit title and badge */}
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm">{fieldService?.identifier}</CardTitle>
            <Badge variant="outline">{fieldService.status}</Badge>
          </div>

          {/* Right: Button */}
          <ShadCnButton variant="default" className="w-full md:w-[150px] h-[30px] text-sm">
            + Add Service Visit
          </ShadCnButton>

          {/* Center: Accordion */}
          <Accordion type="single" collapsible className="w-full md:w-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger></AccordionTrigger>
              <AccordionContent>
                {/* Your accordion content here */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardHeader>

        <CardContent>
          <FormProvider {...methods}>
            <form className="flex flex-col gap-4">

              {/* First Row */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <FormInput
                  name="title"
                  label="Title"
                  placeholder="Title"
                  value={fieldService.title}
                  className="text-gray-700 w-full md:w-1/3"
                />
                <FormField
                  name="Appointment Date From"
                  label="Appointment Date From"
                  className="text-gray-700 w-full md:w-1/3"
                >
                  {({ field }) => (
                    <FormCalendar value={fieldService?.appointmentFromDateTime ?? ""} onChange={field.onChange} />
                  )}
                </FormField>
                <FormField
                  name="Appointment Date To"
                  label="Appointment Date To"
                  className="text-gray-700 w-full md:w-1/3"
                >
                  {({ field }) => (
                    <FormCalendar value={fieldService?.appointmentToDateTime ?? ""} onChange={field.onChange} />
                  )}
                </FormField>
              </div>

              {/* Second Row */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <FormSelect
                  name="Status"
                  label="Status"
                  className="text-gray-700 w-full md:w-1/3"
                  options={[
                    { value: fieldService?.status, label: fieldService?.status }
                  ]}
                />
                <FormInput
                  name="Category"
                  label="Category"
                  className="text-gray-700 w-full md:w-1/3"
                  value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <FormSelect
                  name="Service Representative"
                  label="Service Representative"
                  className="text-gray-700 w-full md:w-1/3"
                  options={[
                    { value: fieldService?.ownerUsername, label: fieldService?.ownerUsername }
                  ]}
                />
              </div>

              {/* Customer Address */}
              <div className="w-full">
                <FormTextarea
                  name="Customer Address"
                  label="Customer Address"
                  className="text-gray-700 w-full"
                  value={(fieldService?.location ?? "").replace(/, /g, '\n')}
                />
              </div>

              {/* Attachments */}
              {fieldService?.attachments?.map((attachment) => {
                const formatted = formatDateTime(attachment.uploadedDateTime);
                return (
                  <div
                    key={attachment.identifier}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-100 rounded px-4 py-2 w-full shadow-sm mb-2"
                  >
                    {/* File info */}
                    <div className="flex items-start sm:items-center space-x-3">
                      {/* File icon */}
                      <svg className="w-5 h-5 text-gray-500 mt-1 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L13 1.586A2 2 0 0011.586 1H4z" />
                      </svg>
                      <div className="text-sm text-gray-700">
                        <a
                          href={attachment.attachmentUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-medium hover:underline block"
                        >
                          {attachment.fileName}
                        </a>
                        <div className="text-gray-500 text-xs">
                          Attached by {attachment.attachedByUsername} · {formatted}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitDetails;
