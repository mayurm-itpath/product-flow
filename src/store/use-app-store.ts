import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore {
  userInfo:
    | {
        [key: string]: any;
      }
    | null
    | undefined;
  setUserInfo: (userInfo: AppStore["userInfo"]) => void;
  clearUserInfo: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo: any) => set({ userInfo }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "product-flow-app-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
