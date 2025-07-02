import { useState } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import EditDialog from '@/components/molecules/EditDialog/EditDialog';
import { FormInput, FormSelect } from '@/components/molecules/ReactHookForm';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useAppStore from '@/stores/appStore';
import useAccountsStore from '@/stores/useAccountStore';
import { TokenPayload } from '@/types/auth.types';

import { createCustomer } from '../api/company.api';
import { useGetCustomerAddress } from '../hook/useGetCustomerAddress';
import { useCustomerAddressStore } from '../store/useCustomerAddressStore';
import { CurrencyType } from '../types/customer.type';

export type CurrencyOptionType = {
  value: string;
  label: string;
  fullData: CurrencyType;
};

type FormData = {
  customerBranchName: string;
  cutomername: string;
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

const CreateCustomer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { userId, tenantId } = payload as TokenPayload;
  const navigate = useNavigate();
  useGetCustomerAddress({ open });
  const { stateList, countryList, districtList, currencyList, roleList } =
    useCustomerAddressStore();

  const [loading, setLoading] = useState(false);

  const methods = useForm<FormData>({
    defaultValues: {
      customerBranchName: '',
      cutomername: '',
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

  const { control, handleSubmit, reset } = methods;

  const selectedCountry = useWatch({ control, name: 'country' });
  const selectedState = useWatch({ control, name: 'state' });

  // 🌍 Filter based on selections
  const filteredStates = stateList.filter(
    (state: any) => state?.countryCode?.toString() === selectedCountry?.iso2
  );

  const filteredDistricts = districtList.filter(
    (district: any) => district?.stateId === selectedState?.id
  );

  const handleDialogClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: FormData) => {
    console.log('🚀 onSubmit called!'); // Add this line
    console.log('✅ Form submitted with data:', data);
    const selectedCurrency = currencyList.find(
      (c: any) => c.id === data.currency || c.value === data.currency
    );

    const selectedRole = roleList?.find(
      item => item.roleId.id.toString() === data.roles
    );

    setLoading(true);
    const payload = {
      regAddress: {
        isShipping: true,
        isBilling: true,
        primaryContact: data?.name,
        gst: data?.tax,
        addressLine: data?.address,
        locality: data?.locality,
        locationUrl: '',
        lattitude: '',
        longitude: '',
        country: data?.country?.name || '',
        state: data?.state?.name || '',
        pinCodeId: data?.pincode,
        city: data?.city,
        district: data?.district?.name || '',
        branchName: data?.branchname,
        mobileNo: data?.phone,
        phone: '',
        iso2: data?.country?.iso2 || '',
        callingCodes: data?.country?.callingCodes || '',
        countryData: data?.country,
        stateData: data?.state,
        countryCode: data?.country?.iso2 || '',
        countryCodeIso: data?.country?.iso2 || '',
        districtData: data?.district,
      },
      currencyId: selectedCurrency ?? {},
      displayName: data?.name,
      mobileNo: data?.phone,
      jobTitle: data?.job,
      department: data?.department,
      userEmail: data?.email,
      pan: null,
      id: 0,
      cognitoUserId: 'temporary_name',
      invitedBy: userId,
      businessTypeId: 808,
      businesstype: {
        id: 808,
        name: 'EPC',
        tenantId: Number(tenantId),
      },
      companyLogo: '/images/default-placeholder.png',
      status: 'CREATED',
      inviteAccess: 0,
      accountTypeId: 2,
      userId: null,
      companyName: data?.name,
      fullStock: true,
      // roleName: data?.roles,
       roleName: selectedRole?.roleId.roleName || '',
      activated: true,
        roleId: selectedRole?.roleId.id || null,
      verified: true,
    };

    console.log('🟢 Final Payload:', payload);

    const response = await createCustomer(tenantId, token, payload);

    if (response) {
      toast.success('Customer created successfully');
      reset();
      setOpen(false);
      navigate('/customers');
    } else {
      toast.error('Customer failed to create');
    }

    setLoading(false);
  };

  return (
    <div>
      <EditDialog
        open={open}
        title="Create Customer"
        closeDialog={handleDialogClose}
        // handleSubmit={methods.handleSubmit(onSubmit)}
        hideDialogActions={false}
        widthClass="md:max-w-xl"
        loading={loading}
        primaryBtnText="Create Customer"
      >
        <FormProvider {...methods}>
          <form
            id="create-customer-form"
            onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            <div className="bg-white rounded-lg">
              {/* <FormSelect
                name="customerBranchName"
                label="Search By Company Name"
                placeholder="Customer branch name"
                className="text-gray-700"
                options={[]}
              /> */}
              {/* <FormSelect
                name="sellername"
                label="Seller Name"
                placeholder="Seller name"
                className="text-gray-700"
                options={[]}
                rules={{ required: 'Contact person is required' }}
              /> */}

              {/* <h3 className="font-semibold text-lg mb-2">Address Details</h3> */}

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <FormInput
                  name="cutomername"
                  label="Customer Name *"
                  placeholder="Customer name"
                  className="text-gray-700 "
                  rules={{ required: 'Customer name is required' }}
                />

                <FormInput
                  name="branchname"
                  label="Branch Name"
                  placeholder="Branch name"
                  className="text-gray-700"
                />

                <FormInput
                  name="address"
                  label="Address"
                  className="text-gray-700"
                  placeholder="Address"
                />
                <FormInput
                  name="locality"
                  label="Locality"
                  className="text-gray-700"
                  placeholder="Locality"
                />
                <FormSelect
                  name="country"
                  label="Country"
                  placeholder="Select a country"
                  className="text-gray-700"
                  options={countryList}
                />
                <FormSelect
                  name="state"
                  label="State/province"
                  placeholder="State/province"
                  className="text-gray-700"
                  options={filteredStates}
                />
                <FormSelect
                  name="district"
                  label="District"
                  placeholder="District"
                  className="text-gray-700"
                  options={filteredDistricts}
                />
                <FormInput
                  name="city"
                  label="City"
                  className="text-gray-700"
                  placeholder="City"
                />
                <FormInput
                  name="pincode"
                  label="Postal Code / PIN Code"
                  placeholder="PIN Code"
                  className="text-gray-700 md:w-[320px]"
                />
              </div>

              <div className="flex my-3">
                <h4 className="lg:mr-4 mr-2 text-sm lg:text-md font-semibold">
                  Address for
                </h4>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="billing" defaultChecked />
                    <Label htmlFor="billing" className="text-gray-600">
                      Billing
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="shipping" />
                    <Label htmlFor="shipping" className="text-gray-600">
                      Shipping
                    </Label>
                  </div>
                </div>
              </div>

              <FormInput
                name="tax"
                label="Tax ID"
                placeholder="Tax ID/GST#"
                className="text-gray-700"
              />
              <FormSelect
                name="business"
                label="Business Type *"
                placeholder="Business type"
                className="text-gray-700"
                options={[
                  { value: 'WEB', label: 'WEB' },
                  { value: 'Mobile', label: 'Mobile' },
                ]}
                rules={{ required: 'Business Type is required' }}
              />
              <FormSelect
                name="currency"
                label="Currency *"
                placeholder="Select currency"
                className="text-gray-700"
                options={Array.isArray(currencyList) ? currencyList : []}
                rules={{ required: 'Currency is required' }}
              />
            </div>

            <div className="bg-white rounded-lg">
              <h3 className="font-semibold text-lg mb-2">
                Customer - User Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full">
                <FormInput
                  name="name"
                  label="Name"
                  placeholder="Name"
                  autoComplete="Name"
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <PhoneInput
                        country="in"
                        inputClass="!w-full h-[36px] !rounded-sm text-black !border !border-gray-300 p-1 pl-2"
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
                  className="text-gray-700"
                  placeholder="Business email"
                />
                <FormSelect
                  name="roles"
                  label="Roles"
                  placeholder="Roles"
                  className="text-gray-700"
                  // options={roleList?.map(item => ({
                  //   value: item.roleId.roleName,
                  //   label: item.roleId.roleName,
                  //   fullData: item,
                  // }))}

                  options={roleList?.map(item => ({
    value: item.roleId.id.toString(), // Use roleId (not roleName)
    label: item.roleId.roleName,
    fullData: item,
  }))}

                  // options={roleList
                  //   ?.filter(item => item.accountTypeId?.id === 2) // ✅ Filter for Buyers
                  //   .map(item => ({
                  //     value: item.roleId?.roleName || '',
                  //     label: item.roleId?.roleName || '',
                  //     fullData: item,
                  //   }))}
                />
                <FormInput
                  name="job"
                  label="Job Title"
                  className="text-gray-700"
                  placeholder="Job title"
                />
                <FormInput
                  name="department"
                  label="Department"
                  className="text-gray-700"
                  placeholder="Department"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </EditDialog>
    </div>
  );
};

export default CreateCustomer;
