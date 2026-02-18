import { AuthProvider } from "./AuthProvider";
import { LanguageProvider } from "./LanguageProvider";
import { ThemeProvider } from "./ThemeProvider";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </NuqsAdapter>
  );
};
