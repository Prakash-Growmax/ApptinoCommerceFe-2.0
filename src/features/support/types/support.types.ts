
type SupportFilterType = {
  status?: string;
  category?: string;
  priority?: string;
  ticketIdentifier?: string;
  // Add other filter keys as needed
};
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
export type SupportTicketFilter = {
  status: string[];
  setStatus: (status: string[]) => void;
  category: string[];
  setCategory: (category: string[]) => void;
  fieldUser:any[];
  setFieldUser:(fieldUser:any[])=>void;
  
};
export type SupportTicketType={
    ticketId:string | number;
  setTicketId:(ticketId:string | number)=>void;
  searchText:string;
  setSearchText:(searchText:string)=>void;
  priority:string
  setPriority:(priority:string)=>void;
  supportStatus:string;
  setSupportStatus:(supportStatus:string)=>void;
  supportCategory:string;
  setSupportCategory:(supportCategory:string)=>void;
}
export type CreateFiledService={
  open:boolean;
  setOpen:(open:boolean)=>void;
}
export type UpdateType = {
  updated: boolean;
  setUpdated: (updated: boolean) => void;
};
