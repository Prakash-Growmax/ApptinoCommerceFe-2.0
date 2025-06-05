import { create } from "zustand";
import { CompanyState } from "../types/company.types";

const useCompanyStore = create<CompanyState>((set)=>({
  companyData: [],
  setCompanyData: (companyData) => set({companyData}),
  
  loading: false,
  setLoading: (loading) => set({ loading }),
    error: '',
  setError: (error) => set({ error }),
}))
export default useCompanyStore;