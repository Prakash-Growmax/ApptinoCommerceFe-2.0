import { create } from "zustand";
import { SupportTicketFilter, UpdateType } from "../types/support.types";

export const useSupportTicketFilterStore = create<SupportTicketFilter>((set) => ({
  status: [],
  setStatus: (status) => set({ status }),
  category: [],
  setCategory: (category) => set({ category }),
   fieldUser:[],
   setFieldUser:(fieldUser)=>set({fieldUser}),
   issueCategory:[],
   setIssueCategory:(issueCategory)=>set({ issueCategory}),
   reason:[],
   setReason:(reason)=>set({reason}),
   severity:[],
   setSeverity:(severity)=>set({severity})
}));

export const useUpdateServiceStore = create<UpdateType>((set) => ({
  updated: false,
  setUpdated: (updated) => set({ updated }), // ✅ fixed spelling
}));
