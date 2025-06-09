// stores/useAccountsStore.ts

import { create } from 'zustand';
import { SupportType } from '../types/support.types';


const useSupportStore = create<SupportType>((set) => ({
  supportData: [],
  setSupportData: (supportData) => set({supportData}),

  loading: false,
  setLoading: (loading) => set({ loading }),

  filters: [],
  setFilters: (filters) => set({ filters }),

  error: '',
  setError: (error) => set({ error }),

 

  totalCount: 0,
  setTotalCount: (totalCount) => set({ totalCount }),

  page: 0,
  setPage: (updater) =>
    set((state) => ({
      page: typeof updater === 'function' ? updater(state.page) : updater,
    })),

  rowPerPage: 20,
  setRowPerPage: (rowPerPage) => set({ rowPerPage }),
}));


export default useSupportStore;