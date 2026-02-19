import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useTranslation } from "react-i18next";
import { CreateGuarantorForm } from "../../forms";

type DashboardCreateGuarantorPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardCreateGuarantorPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title="Dashboard Guarantor">
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.guarantor.title")}
          className="space-y-5"
        >
          <CreateGuarantorForm />
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardCreateGuarantorPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardCreateGuarantorPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
