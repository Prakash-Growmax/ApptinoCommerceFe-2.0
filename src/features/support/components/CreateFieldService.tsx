import EditDialog from "@/components/molecules/EditDialog/EditDialog";
import { FormInput, FormTextarea } from "@/components/molecules/ReactHookForm";
import { Form, useForm } from "react-hook-form";

type CreateFieldServiceProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CreateFieldService = ({ open, setOpen }: CreateFieldServiceProps) => {
  const handleClose = () => {
    setOpen(false);
  };
   const methods = useForm({
      defaultValues: {
     
      },
      // mode: "onSubmit",
    });

  return (
    <EditDialog open={open} closeDialog={handleClose} title="Create FieldService">
       <Form form={methods}  className="space-y-4 ">
        <FormInput
         name="subject"
         label="Subject"
          placeholder="subject"
        />
        <FormTextarea
        name="description"
        label="Description"
        placeholder="description"
        />
       </Form>
    </EditDialog>
  );
};
export default CreateFieldService