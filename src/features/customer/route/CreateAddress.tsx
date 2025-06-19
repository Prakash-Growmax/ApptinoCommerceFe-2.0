import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FormData = {
  customerBranchName: string;
  sellername: string;
  branchname: string;
  address: string;
  locality: string;
  country: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  tax: string;
  business: string;
  currency: string;
  name: string;
  phone: string;
  email: string;
  roles: string;
  job: string;
  department: string;
};

const AddressTicketsDialog = () => {
  const [open, setOpen] = useState(false);


  const countryOptions = [
  { label: 'Afghanistan (AF)', value: 'AF' },
  { label: 'Albania (AL)', value: 'AL' },
  { label: 'Algeria (DZ)', value: 'DZ' },
  { label: 'Andorra (AD)', value: 'AD' },
  { label: 'Angola (AO)', value: 'AO' },
  { label: 'Argentina (AR)', value: 'AR' },
  { label: 'Australia (AU)', value: 'AU' },
  // Add all other countries here...
];

  
    const methods = useForm<FormData>({
  defaultValues: {
    customerBranchName: '',
    sellername: '',
    branchname: '',
    address: '',
    locality: '',
    country: '',
    state: '',
    district: '',
    city: '',
    pincode: '',
    tax: '',
    business: '',
    currency: '',
    name: '',
    phone: '',
    email: '',
    roles: '',
    job: '',
    department: '',
  },
});
  
  const { register, watch, setValue, handleSubmit, reset, control } = methods;

  const handleDialogClose = () => {
    setOpen(false);
    methods.reset();
  };
  const onSubmit = async (data: FormData) => {};

  return (
    <>
      <ShadCnButton onClick={() => setOpen(true)} className='w-[140px] flex '>Create Customer </ShadCnButton>
      <div className="">
        <EditDialog
          open={open}
          title="Create New Ticket"
          closeDialog={handleDialogClose}
          handleSubmit={methods.handleSubmit(onSubmit)}
          hideDialogActions={false}
            widthClass="md:max-w-xl" 
          headerContent={(
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold text-primary uppercase "> Create Customer</h2>
      <button
        type="button"
        onClick={handleDialogClose}
        className="text-gray-500 hover:text-black text-xl"
      >
        
      </button>
    </div>
  )}
   loading={false}
        >
          <Form form={methods} onSubmit={onSubmit} className=" ">
            <div className="bg-white  rounded-lg">
              <div>
                <FormSelect
                  name="customerBranchName"
                  label="Search By Company Name"
                  placeholder="Customer branch name"
                  className="text-gray-700 "
                  options={[]}
                />
                <FormSelect
                  name="sellername"
                  label="Seller Name"
                  placeholder="Seller name"
                  className="text-gray-700 "
                  options={[]}
                   rules={{ required: 'Contact person is required' }}
                />
              </div>

              <div className="  ">
                <h3 className="font-semibold text-lg mb-2">Address Details</h3>
                {/* <Controller
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
                /> */}

                <FormInput
                  name="branchname"
                  label="Branch Name"
                  placeholder="Branch name"
                  className="text-gray-700 "
                />

                <FormInput
                  name="address"
                  label="Address"
                  className="text-gray-700 "
                  placeholder="Address"
                />
                <FormInput
                  name="locality"
                  label="Locality"
                  className="text-gray-700 "
                  placeholder="Locality"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 ">
                  <FormSelect
                    name="country"
                    label="Country"
                    placeholder="Select a country"
                    className="text-gray-700 "
                     options={countryOptions}
                    disabled={false}
                  />

                  <FormSelect
                    name="state"
                    label="State/province"
                    placeholder="State/province"
                    className="text-gray-700 "
                    options={[
                      { value: 'Low', label: 'Low' },
                      { value: 'High', label: 'High' },
                    ]}
                    disabled={false}
                  />
                  <FormSelect
                    name="district"
                    label="District"
                    placeholder="District"
                    className="text-gray-700 "
                    options={[
                      { value: 'Field Work', label: 'Field Work' },
                      { value: 'Repair reasons', label: 'Repair reasons' },
                    ]}
                    disabled={false}
                  />
                  <FormSelect
                    name="city"
                    label="City"
                    placeholder="City"
                    className="text-gray-700 "
                    options={[
                      { value: 'WEB', label: 'WEB' },
                      { value: 'Mobile', label: 'Mobile' },
                    ]}
                    disabled={false}
                  />
                  <FormInput
                    name="pincode"
                    label="PIN Code"
                    placeholder="PIN Code"
                    className="text-gray-700 md:w-[320px]"
                  />
                </div>
                <div className="flex my-3">
                  <h4 className="mr-4 font-semibold  ">Address for</h4>
                  <RadioGroup defaultValue="option-one" className="flex ">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one"   />
                      <Label htmlFor="option-one" className='text-gray-600' >Billing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two" className='text-gray-600' >Shipping</Label>
                    </div>
                  </RadioGroup>
                </div>

                <FormInput
                  name="tax"
                  label="Tax ID"
                  placeholder="Tax ID/GST#"
                  className="text-gray-700 "
                />
                <FormSelect
                  name="business"
                  label="Business Type"
                  placeholder="Business type"
                  className="text-gray-700 "
                  options={[
                    { value: 'WEB', label: 'WEB' },
                    { value: 'Mobile', label: 'Mobile' },
                  ]}
                  disabled={false}
                />
                <FormSelect
                  name="currency"
                  label="Currency"
                  placeholder="Currency"
                  className="text-gray-700 "
                  options={[
                    { value: 'WEB', label: 'WEB' },
                    { value: 'Mobile', label: 'Mobile' },
                  ]}
                  disabled={false}
                />
              </div>
            </div>

            {/* --------------------------------------------------- */}
            <div className="bg-white  rounded-lg">
              <h3 className="font-semibold text-lg mb-2">
                Customer - User Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 w-[full]  ">
                <FormInput
                  name="name"
                  label="Name"
                  placeholder="Name"
                  autoComplete="Name"
                />
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: 'Phone is required' }}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium  mb-1">
                        Customer Contact Number
                      </label>
                      <PhoneInput
                        {...field}
                        country={'in'}
                        inputClass="!w-full !form-input !rounded-md !border !border-gray-300 !py-2"
                        placeholder="Enter phone number"
                        enableSearch
                        inputStyle={{ width: '100%' }}
                        onChange={value => field.onChange(value)}
                      />
                    </div>
                  )}
                />
                <FormInput
                  name="email"
                  label="Business Email"
                  className="text-gray-700 "
                  placeholder="Business email"
                />
                <FormSelect
                  name="roles"
                  label="Roles"
                  placeholder="Roles"
                  className="text-gray-700 "
                  options={[
                    { value: 'WEB', label: 'WEB' },
                    { value: 'Mobile', label: 'Mobile' },
                  ]}
                  disabled={false}
                />
                <FormInput
                  name="job"
                  label="Job Title"
                  className="text-gray-700 "
                  placeholder="Job title"
                />
                <FormInput
                  name="department"
                  label="Department"
                  className="text-gray-700 "
                  placeholder="Department"
                />
              </div>
            </div>
          </Form>
        </EditDialog>
      </div>
    </>
  );
};

export default AddressTicketsDialog;
