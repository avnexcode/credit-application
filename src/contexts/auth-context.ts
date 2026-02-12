import { createContext } from "react";

export type AuthContextProps = {
  isLogin: boolean;
  isLoading: boolean;
  isUserLoading: boolean;
  isSettingsLoading: boolean;
  user?: string;
  settings?: string;
  startAuthCheck: () => void;
  stopAuthCheck: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
