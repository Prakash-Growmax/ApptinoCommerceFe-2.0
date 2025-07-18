import { useState } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import EditDialog from '@/components/molecules/EditDialog/EditDialog';
import { FormInput, FormSelect } from '@/components/molecules/ReactHookForm';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import useAppStore from '@/stores/appStore';
import { TokenPayload } from '@/types/auth.types';

import { createCustomer } from '../api/company.api';
import { useGetCustomerAddress } from '../hook/useGetCustomerAddress';
import { useCustomerAddressStore } from '../store/useCustomerAddressStore';

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

  const {
    stateList,
    countryList,
    districtList,
    currencyList,
    roleList,
    businessTypeList,
  } = useCustomerAddressStore();



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

  const filteredStates = stateList.filter(
    (state: any) =>
      state?.countryCode?.toLowerCase() === selectedCountry?.iso2?.toLowerCase()
  );


  const filteredDistricts = districtList.filter(
    (district: any) => district?.stateId === selectedState?.id
  );
  const districtOptions = filteredDistricts.map((district: any) => ({
    label: district.name,
    value: district.id,
  }));


  const handleDialogClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: FormData) => {


    const selectedCurrency = currencyList.find(
      (c: any) => c.value === data.currency
    )?.fullData;

    const selectedRole = roleList?.find(
      (item) => item.roleId.id.toString() === data.roles
    );

    const selectedBusinessType = businessTypeList.find(
      (item: any) => item.id.toString() === data.business
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
        // iso2: selectedCountry?.iso2 || '',
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
      businessTypeId: selectedBusinessType?.id || null,
      businesstype: selectedBusinessType || '',
      companyLogo: '/images/default-placeholder.png',
      status: 'CREATED',
      inviteAccess: 0,
      accountTypeId: 2,
      userId: null,
      companyName: data?.name,
      fullStock: true,
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
    <>
      <EditDialog
        open={open}
        title="Create Customer"
        closeDialog={handleDialogClose}
        hideDialogActions={false}
        widthClass="md:max-w-xl"
        loading={loading}
        primaryBtnText="Create Customer"
      >
        <FormProvider {...methods}>
          <form id="create-customer-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <FormInput
                  name="cutomername"
                  label="Customer Name "
                  placeholder="Customer name"
                  className="text-foreground"
                  rules={{ required: 'Customer name is required' }}
                />

                <FormInput
                  name="branchname"
                  label="Branch Name"
                  placeholder="Branch name"
                  className="text-foreground"
                />

                <FormInput
                  name="address"
                  label="Address"
                  className="text-foreground"
                  placeholder="Address"
                />
                <FormInput
                  name="locality"
                  label="Locality"
                  className="text-foreground"
                  placeholder="Locality"
                />
                <FormSelect
                  name="country"
                  label="Country"
                  placeholder="Select a country"
                  className="text-foreground z-[9999]"

                  options={countryList.map((country) => ({
                    value: country,
                    label: country.name,
                  }))}
                />
                <FormSelect
                  name="state"
                  label="State/province"
                  placeholder="State/province"
                  className="text-foreground z-[9999]"
                  options={filteredStates.map((state: any) => ({
                    value: state,
                    label: state.name,
                  }))}
                />
                <FormSelect
                  name="district"
                  label="District"
                  placeholder="Search a District"
                  className='z-10'
                  options={districtOptions}
                  isDisabled={!selectedState}
                />


                <FormInput
                  name="city"
                  label="City"
                  className="text-foreground"
                  placeholder="City"
                />
                <FormInput
                  name="pincode"
                  label="Postal Code / PIN Code"
                  placeholder="PIN Code"
                  className="text-foreground md:w-[320px]"
                />
              </div>

              <div className="flex my-3">
                <h4 className="lg:mr-4 mr-2 text-sm lg:text-md font-semibold">
                  Address for
                </h4>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="billing" defaultChecked />
                    <Label htmlFor="billing" className="text-muted-foreground">
                      Billing
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="shipping" />
                    <Label htmlFor="shipping" className="text-muted-foreground">
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

              <div className="relative z-20 overflow-visible">
                <FormSelect
                  name="business"
                  label="Business Type "
                  placeholder="Business type"
                  className="text-foreground"
                  options={businessTypeList.map((item: any) => ({
                    value: item.id.toString(),
                    label: item.name,
                    fullData: item,
                  }))}
                  rules={{ required: 'Business Type is required' }}
                />
              </div>
              <div className=" relative overflow-visible  z-10 ">

                <FormSelect
                  name="currency"
                  label="Currency"
                  placeholder="Select currency"
                  className="text-gray-700 "
                  options={currencyList}
                />
              </div>
            </div>

            <div className="rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Customer - User Details</h3>

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
                    <PhoneInput
                      country="in"
                      inputClass="!w-full h-[36px] !rounded-sm text-foreground !border !border-input p-1 pl-2"
                      placeholder="Enter phone number"
                      enableSearch
                      inputStyle={{ width: '100%' }}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />

                <FormInput
                  name="email"
                  label="Business Email"
                  className="text-foreground"
                  placeholder="Business email"
                />
                <FormSelect
                  name="roles"
                  label="Roles"
                  placeholder="Roles"
                  className="text-foreground z-10"
                  options={roleList?.map((item) => ({
                    value: item.roleId.id.toString(),
                    label: item.roleId.roleName,
                    fullData: item,
                  }))}
                />
                <FormInput
                  name="job"
                  label="Job Title"
                  className="text-foreground"
                  placeholder="Job title"
                />
                <FormInput
                  name="department"
                  label="Department"
                  className="text-foreground"
                  placeholder="Department"
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </EditDialog>
    </>
  );
};

export default CreateCustomer;







