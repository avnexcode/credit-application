import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Switch } from "@/components/ui/switch";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useTranslation } from "react-i18next";
import {
  LanguageSwitcher,
  SettingsCard,
  SettingsSection,
  ThemeSwitcher,
} from "../components";

type SettingsPageProps = {
  sidebarDefaultOpen: boolean;
};

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("pages.settings.title")}>
      <SectionContainer padded>
        <DashboardLayout
          title={t("pages.settings.title")}
          className="items-center space-y-20"
        >
          <SettingsSection
            title={t("pages.settings.general")}
            caption={t("pages.settings.caption")}
          >
            {" "}
            {/* Language Selector */}
            <SettingsCard
              label={t("pages.settings.settingsCard.language.label")}
              caption={t("pages.settings.settingsCard.language.caption")}
              icon="Globe"
            >
              <LanguageSwitcher />
            </SettingsCard>
            {/* Currency Selector */}
          </SettingsSection>

          <SettingsSection
            title={t("pages.settings.settingsSection.appearance.title")}
            caption={t("pages.settings.settingsSection.appearance.caption")}
          >
            {/* Theme Selector */}
            <SettingsCard
              label={t("pages.settings.settingsCard.theme.label")}
              caption={t("pages.settings.settingsCard.theme.caption")}
              icon="Palette"
            >
              <ThemeSwitcher />
            </SettingsCard>
          </SettingsSection>

          <SettingsSection
            title={t("pages.settings.settingsSection.notifications.title")}
            caption={t("pages.settings.settingsSection.notifications.caption")}
          >
            {/* Theme Selector */}
            <SettingsCard
              label={t("pages.settings.settingsCard.pushNotifications.label")}
              caption={t(
                "pages.settings.settingsCard.pushNotifications.caption",
              )}
              icon="Bell"
            >
              <div className="">
                <Switch />
              </div>
            </SettingsCard>
          </SettingsSection>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

SettingsPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as SettingsPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
