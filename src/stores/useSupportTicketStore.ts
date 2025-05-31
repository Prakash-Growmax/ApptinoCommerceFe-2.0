import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FilterState {
  searchText: string;
  status: string;
  priority: string;
  dob: Date | undefined;
  technician: string;
  setFilters: (filters: {
    searchText: string;
    status: string;
    priority: string;
    dob: Date | undefined;
    technician: string;
  }) => void;
}

export const useSupportTicketStore = create<FilterState>()(
  devtools(
    (set) => ({
      searchText: "",
      status: "",
      priority: "",
      dob: "",
      technician: "",

      setFilters: ({ searchText, status, priority, dob, technician }) =>
        set(
          { searchText, status, priority, dob, technician },
          false,
          "support/setFilters"
        ),
    }),
    // {
    //   name: "SupportTicketStore", // Store name in Zookeeper
    // }
  )
);









// import { create } from 'zustand'

// type FilterState = {
//   search: string
//   status: string
//   priority: string
//   dateOfBirth: string
//   technician: string
//   setFilter: (field: string, value: string) => void
//   resetFilters: () => void
// }

// export const useFilterStore = create<FilterState>((set) => ({
//   search: '',
//   status: '',
//   priority: '',
//   dateOfBirth: '',
//   technician: '',
//   setFilter: (field, value) =>
//     set((state) => ({
//       ...state,
//       [field]: value,
//     })),
//   resetFilters: () =>
//     set({
//       search: '',
//       status: '',
//       priority: '',
//       dateOfBirth: '',
//       technician: '',
//     }),
// }))
