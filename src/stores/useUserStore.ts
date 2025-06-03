import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  userId: number | null;
  companyId: number | null;
  tenantId: string | null;

  setUserId: (id: number) => void;
  setCompanyId: (id: number) => void;
  setTenantId: (id: string) => void;
  resetUserData: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      userId: null,
      companyId: null,
      tenantId: null,

      setUserId: id => set({ userId: id }),
      setCompanyId: id => set({ companyId: id }),
      setTenantId: id => set({ tenantId: id }),

      resetUserData: () =>
        set({ userId: null, companyId: null, tenantId: null }),
    }),
    {
      name: 'user-store', // unique name in storage
      getStorage: () => localStorage, // or sessionStorage
    }
  )
);

export default useUserStore;
