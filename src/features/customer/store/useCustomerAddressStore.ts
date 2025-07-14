// import { create } from "zustand";
// import { CreateCustomer } from "../types/customer.type";



// export const useCustomerAddressStore=create<CreateCustomer>((set)=>({
//   stateList: [],
//   setStateList: (stateList) => set({ stateList }),

//   countryList: [],
//   setCountryList: (countryList) => set({ countryList }),

//   districtList: [],
//   setDistrictList: (districtList) => set({ districtList }),

// currencyList: [],
// setCurrencyList: (list) => set({ currencyList: list }),

//  roleList: [],
//     setRoleList: (list) => set({ roleList: list }),
    
// }))


import { create } from "zustand";
import { CreateCustomer } from "../types/customer.type";

export const useCustomerAddressStore = create<CreateCustomer>((set) => ({
  stateList: [],
  setStateList: (stateList) =>
    set({ stateList: Array.isArray(stateList) ? stateList : [] }),

  countryList: [],
  setCountryList: (countryList) =>
    set({ countryList: Array.isArray(countryList) ? countryList : [] }),

  districtList: [],
  setDistrictList: (districtList) =>
    set({ districtList: Array.isArray(districtList) ? districtList : [] }),

  currencyList: [],
  setCurrencyList: (list) =>
    set({ currencyList: Array.isArray(list) ? list : [] }),

  roleList: [],
  setRoleList: (list) =>
    set({ roleList: Array.isArray(list) ? list : [] }),
}));
