import { Controller, useForm, useFormContext,  } from "react-hook-form";
import { FormInput, FormRadioGroup, FormSelect } from "@/components/molecules/ReactHookForm";
import EditDialog from "@/components/molecules/EditDialog/EditDialog";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Form } from "@/components/molecules/ReactHookForm/Form/Form"; 
import { useSkillsMultiSelect } from "@/hooks/useSkillsMultiSelect";
import { FormField } from "@/components/molecules/ReactHookForm/FormField/FormField";



type FormData = {
  customer: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  subject: string;
  category: string;
  label?: string;
  showLabel?: boolean;
};


const SupportTicketsDialog = () => {
  const [open, setOpen] = useState(false);

    const { skillsList, selectedSkills, toggleSkill } = useSkillsMultiSelect();
  const [skillsOpen, setSkillsOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  
  
  const handleSelect = (skill: string) => {
    toggleSkill(skill);
    setSkillsOpen(false);
  }

  const methods = useForm<FormData>({
    defaultValues: {
      customer: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      subject: '',
      category: ''
    },
    // mode: "onSubmit",
  });
  const { register, watch, setValue, handleSubmit, reset , control } = methods;
  const attachments = watch("attachments");

  
  const handleDialogClose = () => {
    setOpen(false);
    methods.reset();
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    setOpen(false);
    methods.reset();
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
              <FormInput
                name="customer"
                label="Customer"
                placeholder="Search customer"
                autoComplete="customer"
                rules={{ required: "Customer is required" }}
              />

              <FormInput
                name="contactPerson"
                label="Contact Person"
                placeholder="Select contact"
                autoComplete="contactPerson"
                rules={{ required: "Contact person is required" }}
              />

              <FormInput
                name="phone"
                label="Phone"
                placeholder="Enter phone number"
                rules={{
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone must be 10 digits",
                  },
                }}
              />

              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="v@gmail.com"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email format",
                  },
                }}
              />

              <FormInput
                name="address"
                label="Address"
                placeholder="Enter address"
                className="col-span-2"
                rules={{ required: "Address is required" }}
              />
            </div>
          </div>

           <div className="bg-white  rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Ticket Details</h3>

              <FormInput
                name="Subject"
                label="Subject"
                placeholder="Brief description of the issue"
                autoComplete="subject"
                rules={{ required: "Subject is required" }}
              />
            <div className="grid grid-cols-2 gap-2 ">

              <FormSelect
                name="category"
                label="Category"
                placeholder="Select a category"
                options={[
                  { value: 'technical', label: 'Technical Issue' },
                  { value: 'billing', label: 'Billing' },
                  { value: 'general', label: 'General Inquiry' },
                ]}
                disabled={false}
              />

              <FormSelect
                name="Priority"
                label="Priority"
                // placeholder="Select a category"
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'High', label: 'High' },
                ]}
                disabled={false}
              />


             <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments
                  </label>
                  <input
                    type="file"
                    {...methods.register("attachments")}
                    multiple
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {methods.watch("attachments")?.length > 0 && (
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                      {Array.from(methods.watch("attachments")).map((file: File, index: number) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                </div> 
              <FormInput
                name="Asset/Serial Number"
                label="Asset/Serial Number"
                placeholder="e.g., SN-123-AB"
                 rules={{ required: "Description is required" }}
              />

            </div>
              <FormInput
                name="Description"
                label="Description"
                placeholder="Detailed description of the issue..."
                 rules={{ required: "Description is required" }}
              />

          </div>

          <div className="bg-white  rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Field Services Details</h3>

            <div className="grid grid-cols-2 gap-2 ">
              <FormSelect
                name="service type"
                label="Service type"
                // placeholder="Select a category"
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'High', label: 'High' },
                ]}
                disabled={false}
              />


              <FormSelect
                name="category"
                label="Category"
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
                options={[
                  { value: 'technical', label: 'technical' },
                  { value: 'billing', label: 'billing' },
                ]}
                disabled={false}
              />

                <div className="relative w-[350px]" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Skills Required
      </label>
      <button
        type="button"
        className="w-full border border-gray-300 rounded-md p-2 text-left"
        onClick={() => setSkillsOpen(true)}
      >
        {selectedSkills.length > 0
          ? selectedSkills.join(", ")
          : "Select skills..."}
      </button>

      {skillsOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow max-h-48 overflow-y-auto">
          {skillsList.map((skill) => (
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
                options={[
                  { value: 'Low', label: 'Low' },
                ]}
                disabled={false}
              />


              <FormSelect
                name="Department"
                label="Department"
                placeholder="Select a Department"
                options={[
                  { value: 'technical', label: 'Technical Issue' },
                  { value: 'billing', label: 'Billing' },
                ]}
                disabled={false}
              />

              <FormSelect
                name="Assign To"
                label="Assign To"
                placeholder="Assign To"
                options={[
                  { value: 'Low', label: 'Low' },
                ]}
                disabled={false}
              />

             <FormSelect
                name="SLA"
                label="SLA"
                placeholder="SLA"
                options={[
                  { value: 'Standard (24)', label: 'Standard (24)' },
                ]}
                disabled={false}
              />

               <FormSelect
                name="Service plan"
                label="Service Plan"
                placeholder="Service plan"
                options={[
                  { value: 'technical', label: 'technical' },
                  { value: 'billing', label: 'billing' },
                ]}
                disabled={false}
              />

                <div className="relative w-[350px]" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Skills Required
      </label>
      <button
        type="button"
        className="w-full border border-gray-300 rounded-md p-2 text-left"
        onClick={() => setSkillsOpen(true)}
      >
        {selectedSkills.length > 0
          ? selectedSkills.join(", ")
          : "Select skills..."}
      </button>

      {skillsOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow max-h-48 overflow-y-auto">
          {skillsList.map((skill) => (
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
              <Controller
      name="priority" // the form field name
      control={control} // from useForm()
      rules={{ required: "Priority is required" }}
      render={({ field }) => (
        <FormRadioGroup
          {...field}
          options={[
            { value: "Search Knowledge Base for similar issues", label: "Search Knowledge Base for similar issues" },
            
          ]}
          // label="Priority"
          disabled={false}
        />
      )}
    />
          
            </div>
            
          </div>
        </Form>
      </EditDialog>
    </>
  );
};

export default SupportTicketsDialog;
