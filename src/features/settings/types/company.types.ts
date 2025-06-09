export interface CompanyState {
  companyData: any[]; // Replace `any` with your actual data type
  setCompanyData: (data: any[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  error: string;
  setError: (error: string) => void;
 
}
export type Pagination={
 
    searchString?:string;
}
export interface BranchState {
  branchData: any[]; // Replace `any` with your actual data type
  setBranchData: (data: any[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  error: string;
  setError: (error: string) => void;
  page:number;
   setPage: (page: number | ((prev: number) => number)) => void;
  rowPerPage:number;
  setRowPerPage:(rowPerPage:number)=>void;
  totalCount:number;
  setTotalCount:(totalCount:number)=>void
 
}