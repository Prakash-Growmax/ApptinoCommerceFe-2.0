import { create } from "zustand";

interface BranchPaginationState {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  rowPerPage: number;
  setRowPerPage: (rowPerPage: number | string) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
}

const useCompanyBranchStore = create<BranchPaginationState>((set) => ({
  page: 0,
  setPage: (updater) =>
    set((state) => ({
      page: typeof updater === 'function' ? updater(state.page) : updater,
    })),
  rowPerPage: 20,
  setRowPerPage: (rowPerPage) => set({ rowPerPage: typeof rowPerPage === 'string' ? parseInt(rowPerPage) : rowPerPage }),
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
}));

export default useCompanyBranchStore;