// stores/useAccountsStore.ts
import { AccountsState } from '@/types/account.type';
import { create } from 'zustand';


const useAccountsStore = create<AccountsState>((set) => ({
  data: [],
  setData: (data) => set({ data }),

  loading: false,
  setLoading: (loading) => set({ loading }),
  filters:[],
  setFilters:(filters)=>set({filters}),
  error: '',
  setError: (error) => set({ error }),
}));

export default useAccountsStore;
