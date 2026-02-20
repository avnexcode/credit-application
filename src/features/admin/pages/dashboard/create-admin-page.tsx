import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { capitalizeWords } from "@/utils";
import { useTranslation } from "react-i18next";
import { CreateAdminForm } from "../../forms";

type DashboardCreateAdminPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardCreateAdminPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.admin.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout title={t("models.admin.title")} className="space-y-5">
          <CreateAdminForm />
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardCreateAdminPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardCreateAdminPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
