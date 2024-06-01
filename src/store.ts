import { create, StateCreator } from 'zustand'
import { InitialLoginState, LoginState, SidebarState } from './types'
import { persist } from 'zustand/middleware'

const initialToken: InitialLoginState = {
  token: '',
}

export const createLoginStore: StateCreator<LoginState, [], [], LoginState> = (
  set
) => ({
  ...initialToken,
  addToken: (newToken) => set(() => ({ token: newToken })),
  resetToken: () => set(() => initialToken),
})

export const createSidebarStore: StateCreator<
  SidebarState,
  [],
  [],
  SidebarState
> = (set) => ({
  openSidebar: false,
  setOpenSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
})

export const useAppStore = create<LoginState & SidebarState>()(
  persist(
    (...a) => ({
      ...createLoginStore(...a),
      ...createSidebarStore(...a),
    }),
    { name: 'vasData' }
  )
)
