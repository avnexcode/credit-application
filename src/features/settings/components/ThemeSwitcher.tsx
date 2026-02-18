"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "../hooks";
import { renderElements } from "@/utils";
import { Globe } from "lucide-react";
import { Icon } from "../../../components/ui/icon";
import { useTranslation } from "react-i18next";

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { defaultTheme, themes, handleThemeChange, isUpdateSettingsPending } =
    useTheme();

  const icons = {
    light: <Icon name="Sun" />,
    dark: <Icon name="Moon" />,
    system: <Icon name="Computer" />,
  } as const;

  return (
    <Select
      value={defaultTheme}
      onValueChange={handleThemeChange}
      disabled={isUpdateSettingsPending}
    >
      <SelectTrigger className="w-42.5 gap-2 capitalize">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {renderElements({
          of: themes,
          keyExtractor: (theme) => theme,
          render: (theme) => {
            const themeKey = `enums.theme.${theme}`;
            return (
              <SelectItem value={theme} className="cursor-pointer capitalize">
                {icons[theme as keyof typeof icons] ?? <Globe />}
                {t(themeKey as any)}
              </SelectItem>
            );
          },
        })}
      </SelectContent>
    </Select>
  );
};
