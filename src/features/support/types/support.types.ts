export type SupportType={
  supportData: any[];
  setSupportData: ( supportData: any[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
  filters: any[];
  setFilters: (filters: any[]) => void;

  error: string;
  setError: (error: string) => void;
   totalCount: number;
  setTotalCount: (totalCount: number) => void;

  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;

  rowPerPage: number;
  setRowPerPage: (rowPerPage: number) => void;
}
export type SupportInfo={
  userId:number,
  tenantId:string,
  token:string
  page?:number;
  rowPerPage?:number;
  body?:any[];
}