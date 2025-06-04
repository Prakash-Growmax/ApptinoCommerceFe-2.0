import EditDialog from "@/components/molecules/EditDialog/EditDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  contactPerson: string;
  customer: string;
  // Add more fields if needed
};

const SupportTicketsdialog = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleDialogClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    setOpen(false);
    reset();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Ticket</Button>
            
            
            <ScrollArea>
      <EditDialog
        open={open}
        title="Create New Ticket"
        closeDialog={handleDialogClose}
        handleSubmit={handleSubmit(onSubmit)}
      >
        
        <form className="space-y-4">
          <div className="space-y-2 bg-white  rounded-lg">
            <h3 className="font-semibold text-lg">Customer Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="customer" className="text-gray-700">Customer</Label>
                <Input
                  id="customer"
                  placeholder="Search customer"
                  className="border-gray-300 mt-2"
                  {...register("customer", { required: "Customer is required" })}
                />
                {errors.customer && (
                  <p className="text-red-500 text-sm">{errors.customer.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="contactPerson" className="text-gray-700">Contact Person</Label>
                <Input
                  id="contactPerson"
                  placeholder="Select contact"
                  className="border-gray-300 mt-2"
                  {...register("contactPerson", { required: "Contact person is required" })}
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-sm">{errors.contactPerson.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" className="border-gray-300 mt-2" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input id="email" placeholder="v@gmail.com" className="border-gray-300 mt-2" />
              </div>

              <div className="space-y-1 col-span-2">
                <Label htmlFor="address" className="text-gray-700">Address</Label>
                <Input id="address" placeholder="Enter address" className="w-full border-gray-300 mt-2" />
              </div>
            </div>
          </div>
        </form>
      </EditDialog>
      </ScrollArea>
    </>
  );
};

export default SupportTicketsdialog;
