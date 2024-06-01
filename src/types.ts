export interface InitialLoginState {
  token: string
}

export interface LoginState extends InitialLoginState {
  addToken: (token: string) => void
  resetToken: () => void
}

export interface SidebarState {
  openSidebar: boolean
  setOpenSidebar: (openSidebar: boolean) => void
}
