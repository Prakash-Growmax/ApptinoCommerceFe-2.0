// types/accountsStore.ts
export interface AccountsState {
  data: any[];
  setData: (data: any[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  filters: any[];
  setFilters: (filters: any[]) => void;

  error: string;
  setError: (error: string) => void;

  searchText: string;
  setSearchText: (searchText: string) => void;

  statuss: string;
  setStatus: (statuss: string) => void;

  totalCount: number;
  setTotalCount: (totalCount: number) => void;

  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;

  rowPerPage: number;
  setRowPerPage: (rowPerPage: number) => void;
}

