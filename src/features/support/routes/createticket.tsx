import { useRef, useState } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import EditDialog from '@/components/molecules/EditDialog/EditDialog';
import {
  FormInput,
  FormRadioGroup,
  FormSelect,
} from '@/components/molecules/ReactHookForm';
import { Form } from '@/components/molecules/ReactHookForm/Form/Form';
import { FormField } from '@/components/molecules/ReactHookForm/FormField/FormField';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { createTicket } from '@/features/auth/api/ticketapi';
import { CreateTicketRequestType } from '@/features/auth/api/tickettype';
import { useGetSupportFilters } from '@/hooks/useGetSupportUsers';
import { useSkillsMultiSelect } from '@/hooks/useSkillsMultiSelect';
import { cn } from '@/lib/utils';
import useSupportStore from '@/stores/useSupportStore';
import useUserStore from '@/stores/useUserStore';

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
  resolutionDueDate?: Date;
};

const SupportTicketsDialog = () => {
  const [open, setOpen] = useState(false);

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
    value: item.id.toString(), // or item.companyID
    label: item.companyName,
    disabled: !item.isActivated, // optional logic to disable inactive ones
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
      problemDescription:'',
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

  const { companyId, tenantId, userId } = useUserStore();
  const username = 'Sudhakar Varatharajan';

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
        updatedByUsername: username,
        createdByUserId: userId,
        createdByUserName: username,
        createdByCompanyId: companyId,
        createdByCompanyName: 'Growmax.io',
        resolution: '',
        domainName: 'dev3',
      },
      // fieldServiceRequestDTO: {
      //   title: 'New Field Service',
      //   ticketIdentifier: null,
      //   ownerUserId: userId,
      //   ownerUsername: username,
      //   status: 'Open',
      //   location: data.address,
      //   appointmentFromDateTime: new Date().toISOString(),
      //   appointmentToDateTime: new Date(
      //     Date.now() + 10 * 24 * 60 * 60 * 1000
      //   ).toISOString(),
      //   createdDateTime: new Date().toISOString(),
      //   updatedDateTime: new Date().toISOString(),
      //   createdByUserId: userId,
      //   createdByUsername: username,
      //   updatedByUserId: userId,
      //   updatedByUsername: username,
      //   attachments: [],
      // },
    };

    console.log('Submitting payload:', JSON.stringify(payload, null, 2));

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Token missing');
      return;
    }

    try {
      const res = await createTicket(payload, token, tenantId);
      alert('Ticket created successfully!');
      setOpen(false);
      reset();
    } catch (error) {
      alert('Ticket creation failed');
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Ticket</Button>

      <EditDialog
        open={open}
        title="Create New Ticket"
        closeDialog={handleDialogClose}
        handleSubmit={methods.handleSubmit(onSubmit)}
      >
        <Form form={methods} onSubmit={onSubmit} className="space-y-4  ">
          <div className="bg-white  rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Customer Information</h3>

            <div className="grid grid-cols-2 gap-2">
              <FormSelect
                name="customer"
                label="Select Customer"
                className="text-gray-700"
                placeholder="Select customer"
                options={supportOptions}
                disabled={false}
              />
              <FormInput
                name="customerBranchName"
                label="Customer Branch Name"
                placeholder="Customer branch name"
                autoComplete="contactPerson"
                // rules={{ required: 'Contact person is required' }}
              />
              <FormInput
                name="contactPerson"
                label="Customer Contact Person"
                placeholder="Select contact person"
                autoComplete="contactPerson"
                // rules={{ required: 'Contact person is required' }}
              />

              <FormInput
                name="email"
                label="Customer Email"
                type="email"
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
                className="text-gray-700"
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
                className="text-gray-700"
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
                className="text-gray-700"
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
                // autoComplete="contactPerson"
                // rules={{ required: 'Contact person is required' }}
              />
              <FormSelect
                name="ticketSource"
                label="Ticket Source"
                placeholder="Ticket Source"
                className="text-gray-700"
                options={[
                  { value: 'WEB', label: 'WEB' },
                  { value: 'Mobile', label: 'Mobile' },
                ]}
                disabled={false}
              />

              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Resolution Due Date
                </label>
                <Controller
                  control={control}
                  name="resolutionDueDate"
                  // rules={{ required: 'Resolution due date is required' }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Select a due date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={date => field.onChange(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
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
            <div className="grid grid-cols-2 gap-2  ">
              <FormInput
                name="problemDescription"
                label="Problem Description"
                placeholder="Problem Description"
                autoComplete="subject"
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
          {/* <div className="bg-white  rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
              Field Services Details
            </h3>

            <div className="grid grid-cols-2 gap-2 ">
              <FormSelect
                name="service type"
                label="Service Type"
                className="text-gray-700"
                placeholder="Select a category"
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'High', label: 'High' },
                ]}
                disabled={false}
              />

              <FormSelect
                name="category"
                label="Category"
                className="text-gray-700"
                placeholder="Select a category"
                options={[
                  { value: 'technical', label: 'Technical Issue' },
                  { value: 'billing', label: 'Billing' },
                  { value: 'general', label: 'General Inquiry' },
                ]}
                disabled={false}
              />

              <FormSelect
                name="Preferred Time"
                label="Preferred Time"
                className="text-gray-700"
                placeholder="Select time slot"
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'High', label: 'High' },
                ]}
                disabled={false}
              />

              <FormSelect
                name="Estimated Duration"
                label="Estimated Duration"
                className="text-gray-700"
                placeholder="Select time slot"
                options={[
                  { value: '1 hour', label: '1 hour' },
                  { value: '2 hour', label: '2 hour' },
                ]}
                disabled={false}
              />

              <FormSelect
                name="Service plan"
                label="Service Plan"
                placeholder="Service plan"
                className="text-gray-700"
                options={[
                  { value: 'technical', label: 'technical' },
                  { value: 'billing', label: 'billing' },
                ]}
                disabled={false}
              />

              <div className="relative w-[350px]" ref={dropdownRef}>
                <label className="block text-sm font-medium  mb-1">
                  Skills Required
                </label>
                <button
                  type="button"
                  className="w-full border border-gray-300 rounded-md p-2 text-left"
                  onClick={() => setSkillsOpen(true)}
                >
                  {selectedSkills.length > 0
                    ? selectedSkills.join(', ')
                    : 'Select skills...'}
                </button>

                {skillsOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow max-h-48 overflow-y-auto">
                    {skillsList.map(skill => (
                      <div
                        key={skill}
                        onClick={() => handleSelect(skill)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          readOnly
                          className="mr-2"
                        />
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white  rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Support Details</h3>

            <div className="grid grid-cols-2 gap-2 ">
              <FormSelect
                name="Channel"
                label="Channel"
                placeholder="Phone"
                className="text-gray-700"
                options={[{ value: 'Low', label: 'Low' }]}
                disabled={false}
              />

              <FormSelect
                name="Department"
                label="Department"
                className="text-gray-700"
                placeholder="Select a department"
                options={[
                  { value: 'technical', label: 'Technical Issue' },
                  { value: 'billing', label: 'Billing' },
                ]}
                disabled={false}
              />

              <FormSelect
                name="Assign To"
                label="Assign to"
                placeholder="Assign To"
                className="text-gray-700"
                options={[{ value: 'Low', label: 'Low' }]}
                disabled={false}
              />

              <FormSelect
                name="SLA"
                label="SLA"
                placeholder="SLA"
                className="text-gray-700"
                options={[{ value: 'Standard (24)', label: 'Standard (24)' }]}
                disabled={false}
              />

              <Controller
                name="priority" // the form field name
                control={control} // from useForm()
                rules={{ required: 'Priority is required' }}
                render={({ field }) => (
                  <FormRadioGroup
                    {...field}
                    options={[
                      {
                        value: 'Search Knowledge Base for similar issues',
                        label: 'Search Knowledge Base for similar issues',
                      },
                    ]}
                    // label="Priority"
                    disabled={false}
                  />
                )}
              />
            </div>
          </div> */}
        </Form>
      </EditDialog>
    </>
  );
};

export default SupportTicketsDialog;
