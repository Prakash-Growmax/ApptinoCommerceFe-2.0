import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import EditDialog from '@/components/molecules/EditDialog/EditDialog';
import {
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormTextarea,
} from '@/components/molecules/ReactHookForm';
import { FormCalendar } from '@/components/molecules/ReactHookForm/Calendar/Calendar';
import { Form } from '@/components/molecules/ReactHookForm/Form/Form';
import { FormField } from '@/components/molecules/ReactHookForm/FormField/FormField';
import { ShadCnButton } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { createTicket } from '@/features/auth/api/ticketapi';
import { CreateTicketRequestType } from '@/features/auth/api/tickettype';
import { useGetSupportFilters } from '@/hooks/useGetSupportUsers';
import { cn } from '@/lib/utils';
import useSupportStore from '@/stores/useSupportStore';
import useUserStore from '@/stores/useUserStore';
import useAppStore from '@/stores/appStore';
import { TokenPayload } from '@/types/auth.types';
import { createTicketss } from '../api/support.api';

type FormData = {
  customer: string;
  customerBranchName: string;
  contactPerson: string;
  email: string;
  phone: string;
  priority: string;
  severity: string;
  reason: string;
  ticketOwner: string;
  ticketSource: string;
  subject: string;
  attachments?: FileList;
  problemDescription?: string;
  category: string;
  label?: string;
  showLabel?: boolean;
  address: string;
  resolutionDueDate?: Date;
  fromdate: Date;
  todate: Date;
};

const SupportTicketsDialog = () => {
  const [open, setOpen] = useState(false);
    const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const {tenantId ,companyId,displayName,companyName,userId} = payload as TokenPayload;

  // const { skillsList, selectedSkills, toggleSkill } = useSkillsMultiSelect();
  // const [skillsOpen, setSkillsOpen] = useState(false);
  // const dropdownRef = useRef(null);

  // const handleSelect = (skill: string) => {
  //   toggleSkill(skill);
  //   setSkillsOpen(false);
  // };

  useGetSupportFilters();
  const { supportData } = useSupportStore();
  const supportOptions = supportData?.map(item => ({
    value: item.id.toString(),
    label: item.companyName,
    disabled: !item.isActivated,
  }));
  const methods = useForm<FormData>({
    defaultValues: {
      customer: '',
      customerBranchName: '',
      contactPerson: '',
      phone: '',
      email: '',
      priority: '',
      severity: '',
      reason: '',
      ticketOwner: '',
      ticketSource: '',
      category: '',
      subject: '',
      problemDescription: '',
      address: '',
      fromdate: new Date(),
      todate: new Date(),
      // attachments: '',
      // showLabel: '',
      // resolutionDueDate: '',
    },
    // mode: "onSubmit",
  });
  const { register, watch, setValue, handleSubmit, reset, control } = methods;
  const attachments = watch('attachments');

  const handleDialogClose = () => {
    setOpen(false);
    methods.reset();
  };

  // const { companyId, tenantId, userId } = useUserStore();
  // const username = 'Sudhakar Varatharajan';

  const handleCustomerChange = (selectedCustomerId: string) => {
    const selectedCustomer = supportData?.find(
      item => item.id.toString() === selectedCustomerId
    );

    console.log('Selected Customer:', selectedCustomer);

    if (selectedCustomer) {
      setValue('customerBranchName', selectedCustomer.branchName || '');
      setValue('contactPerson', selectedCustomer.contactPerson || '');
      setValue('email', selectedCustomer.defaultEmail || '');
      setValue('phone', selectedCustomer.mobileNumber || '');
    }
  };

  useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === 'customer' && value.customer) {
        handleCustomerChange(value.customer);
      }
    });
    return () => sub.unsubscribe();
  }, [watch, supportData]);

  const onSubmit = async (data: FormData) => {
    const payload: CreateTicketRequestType = {
      supportTicketRequestDTO: {
        title: data.subject,
        description: data.problemDescription || '',
        buyerCompanyName: data.customer,
        buyerBranchName: data.customerBranchName,
        buyerEmail: data.email,
        buyerContactNumber: data.phone,
        buyerContactPerson: data.contactPerson,
        ticketOwner: data.ticketOwner,
        dueDateTime: data.resolutionDueDate?.toISOString() || null,
        productSKUs: [],
        referenceIdentifiers: [],
        serialNumbers: [],
        descriptionError: data.problemDescription || '',
        priority: data.priority,
        status: 'Open',
        updatedDateTime: new Date().toISOString(),
        createdDateTime: new Date().toISOString(),
        updatedByUserId: userId,
        updatedByUsername:displayName,
        createdByUserId: userId,
        createdByUserName:displayName,
        createdByCompanyId: companyId,
        createdByCompanyName:companyName,
        resolution: '',
        domainName:tenantId,
      },
      fieldServiceRequestDTO: {
        title: 'New Field Service',
        ticketIdentifier: null,
        ownerUserId: userId,
        ownerUsername:displayName,
        status: 'Open',
        location: data.address,
        appointmentFromDateTime: new Date().toISOString(),
        appointmentToDateTime: new Date(
          Date.now() + 10 * 24 * 60 * 60 * 1000
        ).toISOString(),
        createdDateTime: new Date().toISOString(),
        updatedDateTime: new Date().toISOString(),
        createdByUserId: userId,
        createdByUsername:displayName,
        updatedByUserId: userId,
        updatedByUsername:displayName,
        attachments: [],
      },
    };

    console.log('Submitting payload:', JSON.stringify(payload, null, 2));

    // const token = localStorage.getItem('accessToken');
    // if (!token) {
    //   alert('Token missing');
    //   return;
    // }

    try {
      const response = await createTicketss(tenantId,token,payload)
      alert('Ticket created successfully!');
      setOpen(false);
      reset();
    } catch (error) {
      alert('Ticket creation failed');
      console.error('API Error:', error);
      // console.error(error);
    }
  };

  return (
    <>
      <ShadCnButton onClick={() => setOpen(true)}>Create Ticket</ShadCnButton>
      <div className="">
        <EditDialog
          open={open}
          title="Create New Ticket"
          closeDialog={handleDialogClose}
          handleSubmit={methods.handleSubmit(onSubmit)}
          hideDialogActions={false}
        >
          <Form form={methods} onSubmit={onSubmit} className="space-y-4 ">
            {/* <Form form={methods} onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4"> */}

            <div className="bg-white  rounded-lg">
              <h3 className="font-semibold md:text-lg mb-2">
                Customer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4  ">
                <Controller
                  control={control}
                  name="customer"
                  render={({ field }) => (
                    <FormSelect
                      {...field}
                      label="Select Customer"
                      placeholder="Select Customer"
                      options={supportOptions}
                      onValueChange={value => {
                        field.onChange(value);
                        handleCustomerChange(value);
                      }}
                    />
                  )}
                />
                <FormInput
                  name="customerBranchName"
                  label="Customer Branch Name"
                  placeholder="Customer branch name"
                  className="text-gray-700 md:w-[330px]"
                  autoComplete="contactPerson"

                  // rules={{ required: 'Contact person is required' }}
                />
                <FormInput
                  name="contactPerson"
                  label="Customer Contact Person"
                  placeholder="Select contact person"
                  className="text-gray-700 md:w-[320px]"
                  autoComplete="contactPerson"

                  // rules={{ required: 'Contact person is required' }}
                />

                <FormInput
                  name="email"
                  label="Customer Email"
                  type="email"
                  className="text-gray-700 md:w-[330px]"
                  placeholder="Customer email"
                  // rules={{
                  //   required: 'Email is required',
                  //   pattern: {
                  //     value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  //     message: 'Invalid email format',
                  //   },
                  // }}
                />
                <FormInput
                  name="phone"
                  label="Customer Contact Number"
                  className="text-gray-700 md:w-[320px]"
                  placeholder="Contact number"
                  // rules={{
                  //   required: 'Phone is required',
                  //   pattern: {
                  //     value: /^[0-9]{10}$/,
                  //     message: 'Phone must be 10 digits',
                  //   },
                  // }}
                />
                <FormSelect
                  name="priority"
                  label="Priority"
                  placeholder="Select a Priority"
                  className="text-gray-700 md:w-[330px]"
                  options={[
                    { value: 'Low', label: 'Low' },
                    { value: 'High', label: 'High' },
                  ]}
                  disabled={false}
                />

                <FormSelect
                  name="severity"
                  label="Severity"
                  placeholder="Severity"
                  className="text-gray-700 md:w-[320px]"
                  options={[
                    { value: 'Low', label: 'Low' },
                    { value: 'High', label: 'High' },
                  ]}
                  disabled={false}
                />
                <FormSelect
                  name="reason"
                  label="Reason"
                  placeholder="Reason"
                  className="text-gray-700 md:w-[330px]"
                  options={[
                    { value: 'Field Work', label: 'Field Work' },
                    { value: 'Repair reasons', label: 'Repair reasons' },
                  ]}
                  disabled={false}
                />
                <FormInput
                  name="ticketowner"
                  label="Ticket Owner"
                  placeholder="Ticket Owner"
                  className="text-gray-700 md:w-[320px]"
                  // autoComplete="contactPerson"
                  // rules={{ required: 'Contact person is required' }}
                />
                <FormSelect
                  name="ticketSource"
                  label="Ticket Source"
                  placeholder="Ticket Source"
                  className="text-gray-700 md:w-[330px]"
                  options={[
                    { value: 'WEB', label: 'WEB' },
                    { value: 'Mobile', label: 'Mobile' },
                  ]}
                  disabled={false}
                />
                <FormField
                  name="resolutionDueDate"
                  label=" Resolution Due Date"
                  className="md:w-[320px]"
                >
                  {({ field }) => (
                    <FormCalendar
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                </FormField>
              </div>
            </div>

            <div className="bg-white  rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Ticket Details</h3>

              <FormInput
                name="subject"
                label="Subject"
                placeholder="Brief subject"
                autoComplete="subject"
                // rules={{ required: 'Subject is required' }}
              />
              <div className="  ">
                <FormTextarea
                  name="problemDescription"
                  label="Problem Description"
                  placeholder="Problem Description"
                  className=""
                  // rules={{ required: 'Subject is required' }}
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium  mb-1">
                  Attachments
                </label>
                <input
                  type="file"
                  {...methods.register('attachments')}
                  multiple
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                />
                {methods.watch('attachments')?.length > 0 && (
                  <ul className="mt-2  pl-5 text-sm text-gray-700">
                    {Array.from(methods.watch('attachments')).map(
                      (file: File, index: number) => (
                        <li key={index}>{file.name}</li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* --------------------------------------------------- */}
            <div className="bg-white  rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Appointment</h3>

              <div className="md:flex  gap-10 mb-5">
                <div>
                  <FormField
                    name="fromdate"
                    label="From Date"
                    className="md:w-[320px]"
                  >
                    {({ field }) => (
                      <FormCalendar
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  </FormField>
                </div>
                <FormField
                  name="todate"
                  label="To Date"
                  className="md:w-[330px] "
                >
                  {({ field }) => (
                    <FormCalendar
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 w-[full]  ">
                <FormSelect
                  name="status"
                  label="Status"
                  className="text-gray-700 md:w-[320px]"
                  placeholder="Select status"
                  options={[
                    { value: 'Low', label: 'Low' },
                    { value: 'High', label: 'High' },
                  ]}
                  disabled={false}
                />

                <FormSelect
                  name="representative"
                  label="Select Field Service Representative"
                  className="text-gray-700 md:w-[330px]"
                  placeholder="service representative"
                  options={[
                    { value: 'technical', label: 'Technical Issue' },
                    { value: 'billing', label: 'Billing' },
                    { value: 'general', label: 'General Inquiry' },
                  ]}
                  disabled={false}
                />
              </div>
              <FormTextarea
                name="address"
                label="Customer Address"
                placeholder="Customer address"
                className="text-gray-700 "
                // rules={{
                //   required: 'Phone is required',
                //   pattern: {
                //     value: /^[0-9]{10}$/,
                //     message: 'Phone must be 10 digits',
                //   },
                // }}
              />
            </div>
            {/* <div className="flex justify-end gap-4  ">
              <ShadCnButton
                type="button"
                variant="outline"
                onClick={handleDialogClose}
              >
                Cancel
              </ShadCnButton>
              <ShadCnButton type="submit">Create Ticket</ShadCnButton>
            </div> */}
          </Form>
        </EditDialog>
      </div>
    </>
  );
};

export default SupportTicketsDialog;
