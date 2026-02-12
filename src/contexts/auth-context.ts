import { createContext } from "react";

export type UserResponse = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  image: string;
  providers: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type SettingsResponse = {
  id: string;
  theme: string;
  language: string;
  currency: string;
  notification: boolean;
};

export type AuthContextProps = {
  isLogin: boolean;
  isLoading: boolean;
  isUserLoading: boolean;
  isSettingsLoading: boolean;
  user?: UserResponse;
  settings?: SettingsResponse;
  startAuthCheck: () => void;
  stopAuthCheck: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
