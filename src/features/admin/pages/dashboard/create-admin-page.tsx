import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useTranslation } from "react-i18next";
import { CreateAdminForm } from "../../forms";

type DashboardCreateAdminPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardCreateAdminPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title="Dashboard Admin">
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
