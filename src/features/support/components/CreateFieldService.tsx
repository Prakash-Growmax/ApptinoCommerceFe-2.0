import React, { useEffect, useState } from 'react';
import { Controller, Form, FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Paperclip, UploadCloud, X } from 'lucide-react';
import { toast } from 'sonner';

import EditDialog from '@/components/molecules/EditDialog/EditDialog';
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from '@/components/molecules/ReactHookForm';
import { FormCalendar } from '@/components/molecules/ReactHookForm/Calendar/Calendar';
import { FormField } from '@/components/molecules/ReactHookForm/FormField/FormField';
import useAppStore from '@/stores/appStore';
import { TokenPayload } from '@/types/auth.types';
import { handleError } from '@/utils/errorHandling';

// Types for form data
interface CreateFieldServiceFormData {
  subject: string;
  description: string;
  attachments: File[];
  notes: string;
  appointmentDateFrom: string;
  appointmentDateTo: string;
  fieldServiceRep: string;
  status: string;
  category: string;
  customerAddress: string;
}

import {
  createFieldService,
  getSupportTicketFieldServices,
  postFieldAttachments,
  postFieldNotes,
} from '../api/support.api';
import { useGetSupportFilterSettings } from '../hook/useGetSupportFilterSettings';
import { useSupportTicketFilterStore } from '../store/useSupportTicketFilterStore';

type CreateFieldServiceProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetchFieldData?: () => void;
   setFieldServicesInForm: (data: any[]) => void;
};

const CreateFieldService = ({ open, setOpen, refetchFieldData, setFieldServicesInForm, }: CreateFieldServiceProps): React.JSX.Element => {
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const { payload } = useAppStore();
  const { tenantId, companyId, userId, displayName } = payload as TokenPayload;
  // useGetSupportFilterSettings();

  const methods = useForm({
    defaultValues: {
      subject: '',
      description: '',
      attachments: [] as File[],
      notes: '',
      appointmentDateFrom: '',
      appointmentDateTo: '',
      fieldServiceRep: '',
      status: '',
      category: '',
      customerAddress: '',
         fieldServicesData: [],
    },
  });

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = methods;
  const [FieldServiceData, setFieldServiceData] = useState({});
  const attachments = watch('attachments');

  useEffect(() => {
    methods.register('attachments'); // for file input
  }, [methods]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const updatedFiles = [...attachments, ...files];
    setValue('attachments', updatedFiles);
  };

  const removeAttachment = (index: number) => {
    const updated = attachments.filter((_, i) => i !== index);
    setValue('attachments', updated);
  };
  const [loading, setLoading] = useState(false);
  const { status, issueCategory, fieldUser } = useSupportTicketFilterStore();

  const statusOptions = status?.map((s: string) => ({
    value: s?.trim(),
    label: s,
  }));

  const categoryOptions = issueCategory?.map((c: string) => ({
    value: c?.trim(),
    label: c,
  }));

  const fieldUserOptions = fieldUser?.map((f) => ({
    value: f?.displayName?.trim(),
    label: f?.displayName,
    id: f?.id,
  }));

  // const handleRefreshFieldServices = async (): Promise<void> => {
  //   try {
  //     await refetchFieldData?.();
  //     console.log('Field services data refreshed');
  //   } catch (error: unknown) {
  //     handleError(error, 'handleRefreshFieldServices', 'Failed to refresh field services');
  //   }
  // }

  const handleRefreshFieldServices = async (): Promise<void> => {
  try {
    await refetchFieldData?.(); // ✅ this refetches
    const updatedData = await getSupportTicketFieldServices(tenantId, id); // 🔁 fetch latest
    setFieldServicesInForm(updatedData); // ✅ update RHF with new list
    console.log('Field services data refreshed');
  } catch (error: unknown) {
    handleError(error, 'handleRefreshFieldServices', 'Failed to refresh field services');
  }
};


  const onSubmit = async (data: CreateFieldServiceFormData): Promise<void> => {
    console.log(data)
    setLoading(true)

    try {
      const userRep = fieldUser.find(
        (user) =>
          user.displayName?.trim().toLowerCase() ===
          data?.fieldServiceRep?.trim().toLowerCase()
      );
      const appointmentFromDate = new Date(data?.appointmentDateFrom);
      const appointmentToDate = new Date(data?.appointmentDateTo);
      const payload = {
        title: data?.subject,
        description: data?.description,
        ticketIdentifier: id,
        ownerUserId: userRep?.id,
        ownerUsername: data?.fieldServiceRep,
        status: data?.status,
        location: data?.customerAddress,
        appointmentFromDateTime: appointmentFromDate,
        appointmentToDateTime: appointmentToDate,
        createdDateTime: new Date().toISOString(),
        updatedDateTime: new Date().toISOString(),
        createdByUserId: userId,
        createdByUsername: data?.fieldServiceRep,
        updatedByUserId: userId,
        updatedByUsername: displayName,
        attachments: data?.attachments ?? [],
        category: data?.category

      }
      const res = await createFieldService(tenantId, payload) as any;
      handleRefreshFieldServices();
      if (data?.notes && res?.identifier) {
        var body = {
          ticketIdentifier: id,
          fieldServiceIdentifier: res.identifier,
          identifier: "",
          notes: data?.notes,
          domainName: tenantId,
          createdDateTime: new Date().toISOString(),
          updatedDateTime: new Date().toISOString(),
          createdByUserId: userId,
          createdByUsername: displayName,
          updatedByUsername: displayName,
          updatedByUserId: userId,
        };
        await postFieldNotes(tenantId, body);
      }
      if (res?.identifier && id) {
        await postFieldAttachments(
          tenantId,
          id,
          res.identifier,
          data?.attachments
        );
      }
      if (res) {
        setLoading(false);
        setOpen(false);
        toast.success('Field Service created successfully');
      } else {
        setLoading(false);
        toast.error('Failed to create Field Service');
      }
    } catch (error: unknown) {
      const errorMessage = handleError(error, 'onSubmit', 'Failed to create Field Service');
      setLoading(false);
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    const subscription = methods.watch((value) => {
      console.log("Form Values:", value);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  return (
    <EditDialog
      open={open}
      closeDialog={handleClose}
      title="Create FieldService"
      loading={loading}
      handleSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput name="subject" label="Subject" placeholder="Subject" />
          <FormTextarea
            name="description"
            label="Description"
            placeholder="Description"
          />

          {/* Attachments Section */}
          <div className="flex items-center justify-between border-t pt-4 mt-4 ">
            <div className="flex items-center space-x-2">
              <Paperclip className="w-5 h-5 text-gray-700" />
              <span className="font-semibold text-gray-900">Attachments</span>
            </div>
            <label className="flex items-center space-x-1 text-sm font-medium text-gray-800 hover:text-primary cursor-pointer">
              <UploadCloud className="w-5 h-5" />
              <span>ATTACH</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {attachments.length > 0 && (
            <div className="space-y-2 mt-2">
              {attachments.map((file: File, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center border px-3 py-1 rounded bg-gray-50 text-sm"
                >
                  <span className="truncate max-w-xs">{file.name}</span>
                  <button type="button" onClick={() => removeAttachment(index)}>
                    <X className="w-4 h-4 text-red-500 hover:text-red-700" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <FormTextarea name="notes" label="Notes" placeholder="Notes" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              name="appointmentDateFrom"
              label="Appointment Date From"
              className="text-gray-700"
            >
              {({ field }) => (
                <FormCalendar value={field.value} onChange={field.onChange} />
              )}
            </FormField>

            <FormField
              name="appointmentDateTo"
              label="Appointment Date To"
              className="text-gray-700"
            >
              {({ field }) => (
                <FormCalendar value={field.value} onChange={field.onChange} />
              )}
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormSelect
              name="status"
              label="Status"
              options={statusOptions}
              placeholder="Select Status"
              className='z-10'
            />
            <FormSelect
              name="category"
              label="Category"
              options={categoryOptions}
              placeholder="Select Category"
            />
          </div>

          <FormSelect
            name="fieldServiceRep"
            label="Field Service Rep"
            options={fieldUserOptions}
            placeholder="Select Representative"
          />



          <FormTextarea name="customerAddress" label="Customer Address" placeholder="Enter customer address" />


        </form>
      </FormProvider>
    </EditDialog>
  );
};

export default CreateFieldService;
