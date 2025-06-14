import { create } from "zustand";
import { SupportTicketFilter } from "../types/support.types";

export const useSupportTicketFilterStore = create<SupportTicketFilter>((set) => ({
  status: [],
  setStatus: (status) => set({ status }),
  category: [],
  setCategory: (category) => set({ category }),
}));
