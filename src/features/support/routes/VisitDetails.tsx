import { useForm, FormProvider } from "react-hook-form";
import {
  FormInput,
  FormSelect,
  FormTextarea
} from "@/components/molecules/ReactHookForm";
import { FormCalendar } from "@/components/molecules/ReactHookForm/Calendar/Calendar";
import { FormField } from "@/components/molecules/ReactHookForm/FormField/FormField";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { formatDateTime } from "@/utils/component/dataconverter";
import { useSupportTicketFilterStore } from "../store/useSupportTicketFilterStore";
import { useEffect, useRef } from "react";
import { useSupportDetailStore } from "../store/useSupportDetailStore";
import { isEqual } from '@/utils/object';

const VisitDetails = ({ fieldService }) => {
  const methods = useForm({
    // defaultValues: {
    //   title: fieldService?.title || "",
    //   ownerUsername: fieldService?.ownerUsername || "",
    //   appointmentFromDateTime: fieldService?.appointmentFromDateTime || "",
    //   appointmentToDateTime: fieldService?.appointmentToDateTime || "",
    //   category: fieldService?.category || "",
    //   status: fieldService?.status || "",
    //   location: (fieldService?.location ?? "").replace(/, /g, "\n")
    // }
     defaultValues: {
      fieldServicesData: [
        {
          title: fieldService?.title || "",
      ownerUsername: fieldService?.ownerUsername || "",
      appointmentFromDateTime: fieldService?.appointmentFromDateTime || "",
      appointmentToDateTime: fieldService?.appointmentToDateTime || "",
      category: fieldService?.category || "",
      status: fieldService?.status || "",
      location: (fieldService?.location ?? "").replace(/, /g, "\n")
        },
      ],
    }
  });

  const { setUpdateSupportVisit, setOpenSupportVisit } = useSupportDetailStore();

  const {
    watch,
    formState: { isDirty, dirtyFields }
  } = methods;

  const formValues = watch();
  const lastPayloadRef = useRef(null);

  useEffect(() => {
    if (!isDirty) return;

    const allFormValues = { ...formValues };

    const updatedFormValues = Object.keys(dirtyFields).reduce((acc, key) => {
      let value = allFormValues[key];

      if (
        key === "appointmentFromDateTime" ||
        key === "appointmentToDateTime"
      ) {
        const date = new Date(value);
        const isoString = date.toISOString();
        const formatted = isoString
          .replace("Z", "")
          .replace(/\.\d{3}$/, (ms) => `${ms}334`);
        acc[key] = formatted;
      } else if (key === "location") {
        acc[key] = value.replace(/\n/g, ", ");
      } else {
        acc[key] = value;
      }

      return acc;
    }, {});

    const payload = {
      identifier: fieldService?.identifier ?? "",
      ...updatedFormValues,
      allFormValues
    };

    if (!isEqual(payload, lastPayloadRef.current)) {
      lastPayloadRef.current = payload;
      setUpdateSupportVisit(payload);
     
    }
  }, [formValues, dirtyFields, isDirty, fieldService?.identifier]);
  useEffect(()=>{
    if(isDirty){
      setOpenSupportVisit(true);
    }

  },[isDirty])
  const { status, issueCategory, fieldUser } = useSupportTicketFilterStore();

  const statusOptions = status?.map((s) => ({
    value: s?.trim(),
    label: s
  }));

  const categoryOptions = issueCategory?.map((c) => ({
    value: c?.trim(),
    label: c
  }));

  const fieldUserOptions = fieldUser?.map((f) => ({
    value: f?.displayName?.trim(),
    label: f?.displayName,
    id: f?.id
  }));

  return (
    <FormProvider {...methods}>
      <form className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-gray-800">
              {fieldService?.identifier}
            </h2>
            <Badge variant="outline">{fieldService?.status}</Badge>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            name="title"
            label="Title"
            placeholder="Title"
            className="text-gray-700"
          />
          <FormSelect
            name="ownerUsername"
            label="Service Representative"
            className="text-gray-700 z-30"
            options={fieldUserOptions}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            name="appointmentFromDateTime"
            label="Appointment Date From"
            className="text-gray-700"
          >
            {({ field }) => <FormCalendar {...field} />}
          </FormField>
          <FormField
            name="appointmentToDateTime"
            label="Appointment Date To"
            className="text-gray-700"
          >
            {({ field }) => <FormCalendar {...field} />}
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            name="category"
            label="Category"
            className="text-gray-700"
            options={categoryOptions}
          />
          <FormSelect
            name="status"
            label="Status"
            className="text-gray-700 z-20"
            options={statusOptions}
          />
        </div>

        <div>
          <FormTextarea
            name="location"
            label="Customer Address"
            className="text-gray-700"
          />
        </div>

        {/* Attachments */}
        {fieldService?.attachments?.length > 0 && (
          <div className="space-y-3">
            <TooltipProvider>
              <div className="space-y-2">
                {fieldService.attachments.map((attachment) => {
                  const formatted = formatDateTime(
                    attachment.uploadedDateTime
                  );
                  return (
                    <Tooltip key={attachment.identifier}>
                      <TooltipTrigger asChild>
                        <a
                          href={attachment.attachmentUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start space-x-3 p-3 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm cursor-pointer transition"
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
      </form>
    </FormProvider>
  );
};

export default VisitDetails;
