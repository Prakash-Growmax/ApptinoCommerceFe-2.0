// import create from "zustand";

// interface SupportFilter {
//   status: string | "all";
//   search: string;
//   limit: number;
//   offset: number;
//   [key: string]: any;
// }

// interface SupportStore {
//   filters: SupportFilter;
//   setFilters: (filters: SupportFilter) => void;
//   data: any[];
//   setData: (data: any[]) => void;
//   loading: boolean;
//   setLoading: (loading: boolean) => void;
// }

// const useSupportStore = create<SupportStore>((set) => ({
//   filters: {
//     status: "all",
//     search: "",
//     limit: 20,
//     offset: 0,
//   },
//   setFilters: (filters) =>
//     set(() => ({
//       filters,
//     })),
//   data: [],
//   setData: (data) => set(() => ({ data })),
//   loading: false,
//   setLoading: (loading) => set(() => ({ loading })),
// }));

// export default useSupportStore;
