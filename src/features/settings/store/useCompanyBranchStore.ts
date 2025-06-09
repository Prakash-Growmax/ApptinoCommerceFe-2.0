import { create } from "zustand";
import { BranchState } from "../types/company.types";

const useCompanyBranchStore=create<BranchState>((set)=>({
   branchData:[],
   setBranchData:(branchData)=>set({branchData}),
    loading: false,
  setLoading: (loading) => set({ loading }),
    error: '',
  setError: (error) => set({ error }),
  page:0,
   setPage: (updater) =>
    set((state) => ({
      page: typeof updater === 'function' ? updater(state.page) : updater,
    })),
  rowPerPage:20,
  setRowPerPage:(rowPerPage)=>set({rowPerPage}),
  totalCount:0,
  setTotalCount:(totalCount)=>set({totalCount})
}))
export default useCompanyBranchStore;