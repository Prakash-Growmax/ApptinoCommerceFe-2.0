export type CustomerData = {
  userId: number;
  companyId: number;
  tenantId: string;
  token: string;
};

export type CurrencyType = {
  currencyCode: string;
  decimal: string;
  description: string;
  id: number;
  precision: number;
  symbol: string;
  tenantId: number;
  thousand: string;
};

export type CurrencyOptionType = {
  value: string;
  label: string;
  fullData: CurrencyType;
};

export type RoleType = {
  id: number;
  roleId: {
    id: number;
    roleName: string;
    roleDescription: string;
  };
};









export type CreateCustomer={
 stateList: any[];
  setStateList: (stateList: any[]) => void;

  countryList: any[];
  setCountryList: (countryList: any[]) => void;

  districtList: any[];
  setDistrictList: (districtList: any[]) => void;

  currencyList: any[];
  setCurrencyList: (currencyList: any[]) => void;

   roleList: any[]; 
  setRoleList: (roleList: any[]) => void; 
  
}
