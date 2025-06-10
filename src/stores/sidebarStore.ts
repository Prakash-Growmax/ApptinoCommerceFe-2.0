import { SideOpen } from "@/types/sideOpen.type";
import { create } from "zustand";

const useSideBarStore = create<SideOpen>((set)=>({
    sideOpen:true,
    setSideOpen:(sideOpen)=>set({sideOpen})

}))
export default useSideBarStore ;