import { create } from "zustand";
import { CreateCustomer } from "../types/customer.type";

export const useCustomerAddressStore=create<CreateCustomer>((set)=>({
  stateList: [],
  setStateList: (stateList) => set({ stateList }),

  countryList: [],
  setCountryList: (countryList) => set({ countryList }),

  districtList: [],
  setDistrictList: (districtList) => set({ districtList }),
}))