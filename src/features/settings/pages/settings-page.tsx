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
    <PageContainer title="Settings">
      <SectionContainer padded>
        <DashboardLayout title="Settings" className="items-center space-y-20">
          <SettingsSection
            title="General"
            caption="Basic settings for your account"
          >
            {" "}
            {/* Language Selector */}
            <SettingsCard
              label={t("pages.settings.general.language.title")}
              caption={t("pages.settings.general.language.caption")}
              icon="Globe"
            >
              <LanguageSwitcher />
            </SettingsCard>
            {/* Currency Selector */}
          </SettingsSection>

          <SettingsSection
            title="Appearance"
            caption="Customize how the app looks"
          >
            {/* Theme Selector */}
            <SettingsCard
              label="Theme"
              caption="Choose your color theme"
              icon="Palette"
            >
              <ThemeSwitcher />
            </SettingsCard>
          </SettingsSection>

          <SettingsSection
            title="Notifications"
            caption="Manage your notification preferences"
          >
            {/* Theme Selector */}
            <SettingsCard
              label="Push Notifications"
              caption="Receive notifications about updates"
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
