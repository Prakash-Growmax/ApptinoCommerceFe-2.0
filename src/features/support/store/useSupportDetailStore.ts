import { create } from "zustand";
import { UpdateSupportIssueType } from "../types/support.types";

export const useSupportDetailStore = create<UpdateSupportIssueType>((set) => ({
  updateSupportIssue: [], // your state
  setUpdateSupportIssue: (updateSupportIssue) => set({ updateSupportIssue }), // sets the state
  openSupportIssue: false, // boolean flag
  setOpenSupportIssue: (openSupportIssue) => set({ openSupportIssue }), // sets the flag
  updateSupportVisit:[],
  setUpdateSupportVisit: (updateSupportVisit)=>set({updateSupportVisit}),
   openSupportVisit:false,
   setOpenSupportVisit: (openSupportVisit)=>set({openSupportVisit})

}));
