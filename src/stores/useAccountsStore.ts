import { create } from 'zustand';

const useAccountsStore = create((set) => ({
  data:[],
  loading: true,
  error: false,
  Filters: {
    limit: 10,
    offset: 0,
  },
  totalCount: 0,

  // Equivalent of AccountsDispatch
  updateAccountsState: ({ data, loading, error, Filters, totalCount }) =>
    set((state) => ({
      data,
      loading,
      error,
      Filters: {
        ...state.Filters,
        ...Filters,
      },
      totalCount,
    })),
}));

export default useAccountsStore;