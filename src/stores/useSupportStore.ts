import { create } from "zustand";

interface SupportStoreState {
  supportData: any[];
  isLoading: boolean;
  setSupportData: (data: any[]) => void;
  setSupportLoading: (loading: boolean) => void;
}

const useSupportStore = create<SupportStoreState>((set) => ({
  supportData: [],
  isLoading: false,
  setSupportData: (data) => set({ supportData: data }),
  setSupportLoading: (loading) => set({ isLoading: loading }),
}));

export default useSupportStore;
