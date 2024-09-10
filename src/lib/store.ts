import {
  InitialLoginState,
  LoginState,
  SidebarState,
} from "@/types/store-types";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

const initialToken: InitialLoginState = {
  token: "",
};

export const createLoginStore: StateCreator<LoginState, [], [], LoginState> = (
  set
) => ({
  ...initialToken,
  addToken: (newToken) => set(() => ({ token: newToken })),
  resetToken: () => set(() => initialToken),
});

export const createSidebarStore: StateCreator<
  SidebarState,
  [],
  [],
  SidebarState
> = (set) => ({
  sidebarOpen: false,
  setSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
});

export const useAppStore = create<LoginState & SidebarState>()(
  persist(
    (...a) => ({
      ...createLoginStore(...a),
      ...createSidebarStore(...a),
    }),
    { name: "gasatrya-dashboard" }
  )
);
