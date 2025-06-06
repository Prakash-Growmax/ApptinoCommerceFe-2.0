import { useForm } from "react-hook-form";
import { FormInput, FormSelect } from "@/components/molecules/ReactHookForm";
import EditDialog from "@/components/molecules/EditDialog/EditDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Form } from "@/components/molecules/ReactHookForm/Form/Form"; 

type FormData = {
  customer: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  subject: string;
  category: string;
};


const SupportTicketsDialog = () => {
  const [open, setOpen] = useState(false);

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

            <div className="grid grid-cols-2 gap-2 ">
              <FormInput
                name="Subject"
                label="Subject"
                placeholder="Brief description of the issue"
                autoComplete="subject"
                rules={{ required: "Subject is required" }}
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
        </Form>
      </EditDialog>
    </>
  );
};

export default SupportTicketsDialog;
