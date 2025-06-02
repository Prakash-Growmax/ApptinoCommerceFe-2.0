
import { create } from "zustand";

interface SupportUserState {
  userId: string;
  companyId: string;
  tenantId: string;
  setSupportUser: (user: {
    userId: string;
    companyId: string;
    tenantId: string;
  }) => void;
}

const useSupportUserStore = create<SupportUserState>((set) => ({
  userId: "",
  companyId: "",
  tenantId: "",

  setSupportUser: ({ userId, tenantId }) =>
    set(() => ({ userId, tenantId })),
}));

export default useSupportUserStore;
