import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { EditAdminForm } from "../../forms";

type DashboardEditAdminPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardEditAdminPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: admin, isLoading: isAdminLoading } = api.admin.getById.useQuery(
    { id },
    { enabled: !!id },
  );

  return (
    <PageContainer title="Dashboard Admin">
      <SectionContainer padded>
        <DashboardLayout title={t("models.admin.title")} className="space-y-5">
          {isAdminLoading ? (
            <>Loading...</>
          ) : (
            admin && <EditAdminForm admin={admin} />
          )}
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardEditAdminPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardEditAdminPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
