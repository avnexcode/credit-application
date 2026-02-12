"use client";
import { AuthContext, type AuthContextProps } from "@/contexts";
import { api } from "@/utils";
import { useCallback, useMemo, useState } from "react";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // const { data: user, isLoading: isUserLoading } = api.user.getProfile.useQuery(
  //   undefined,
  //   useMemo(
  //     () => ({
  //       enabled: checkingAuth,
  //       staleTime: 5 * 60 * 1000,
  //       cacheTime: 10 * 60 * 1000,
  //       retry: (failureCount, error) => {
  //         if (
  //           error.data?.httpStatus === 401 &&
  //           error.data.code === "UNAUTHORIZED"
  //         )
  //           return false;
  //         return failureCount < 2;
  //       },
  //     }),
  //     [checkingAuth],
  //   ),
  // );

  // const { data: settings, isLoading: isSettingsLoading } =
  //   api.settings.getByUser.useQuery(
  //     undefined,
  //     useMemo(
  //       () => ({
  //         enabled: checkingAuth,
  //         staleTime: 5 * 60 * 1000,
  //         cacheTime: 10 * 60 * 1000,
  //         retry: (failureCount, error) => {
  //           if (
  //             error.data?.httpStatus === 401 &&
  //             error.data.code === "UNAUTHORIZED"
  //           )
  //             return false;
  //           return failureCount < 2;
  //         },
  //       }),
  //       [checkingAuth],
  //     ),
  //   );

  const startAuthCheck = useCallback(() => {
    setCheckingAuth(true);
  }, []);

  const stopAuthCheck = useCallback(() => {
    setCheckingAuth(false);
  }, []);

  const context: AuthContextProps = useMemo(
    () => ({
      isLogin: !!false,
      isLoading: false,
      isUserLoading: false,
      isSettingsLoading: false,
      user: {
        id: "a1f3c9d2-6b21-4a3e-9f01-2c9d8b7e1234",
        name: "Ahmad Pratama",
        username: "ahmadp",
        email: "ahmad.pratama@example.com",
        phone: "081234567890",
        avatar: "https://example.com/avatars/ahmad.png",
        image: "https://example.com/images/profile-ahmad.jpg",
        providers: "EMAIL",
        role: "ADMIN",
        createdAt: "2026-02-10T08:30:00.000Z",
        updatedAt: "2026-02-10T08:30:00.000Z",
      },
      settings: {
        id: "8f3a2b1c-4d5e-6f70-8a9b-1c2d3e4f5678",
        theme: "DARK",
        language: "ID",
        currency: "IDR",
        notification: true,
      },
      startAuthCheck,
      stopAuthCheck,
    }),
    [startAuthCheck, stopAuthCheck],
  );
  // const context: AuthContextProps = useMemo(
  //   () => ({
  //     isLogin: !!user,
  //     isLoading: isUserLoading || isSettingsLoading,
  //     isUserLoading,
  //     isSettingsLoading,
  //     user,
  //     settings,
  //     startAuthCheck,
  //     stopAuthCheck,
  //   }),
  //   [
  //     isSettingsLoading,
  //     isUserLoading,
  //     settings,
  //     startAuthCheck,
  //     stopAuthCheck,
  //     user,
  //   ],
  // );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
