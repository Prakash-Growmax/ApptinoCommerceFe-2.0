// types/accountsStore.ts
export interface AccountsState {
  data: any[]; // Replace `any` with your actual data type
  setData: (data: any[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
  filters:any[],
  setFilters:(filters:any[])=>void;
  error: string;
  setError: (error: string) => void;
  searchText:string;
  setSearchText:(searchText:string)=>void;
  statuss:string;
  setStatus:(status:string)=>void;
  totalCount:number;
  setTotalCount:(totalCount:number)=>void;
}
