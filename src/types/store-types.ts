export interface InitialLoginState {
  token: string;
}

export interface LoginState extends InitialLoginState {
  addToken: (token: string) => void;
  resetToken: () => void;
}

export interface SidebarState {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
}
