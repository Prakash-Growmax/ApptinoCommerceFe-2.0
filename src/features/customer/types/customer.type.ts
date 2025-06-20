export type CustomerData = {
  userId: number;
  companyId: number;
  tenantId: string;
  token: string;
};
export type CreateCustomer={
 stateList: any[];
  setStateList: (stateList: any[]) => void;

  countryList: any[];
  setCountryList: (countryList: any[]) => void;

  districtList: any[];
  setDistrictList: (districtList: any[]) => void;
}
