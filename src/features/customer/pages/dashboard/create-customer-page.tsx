import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { CreateCustomerForm } from "../../forms";
import { useTranslation } from "react-i18next";

type DashboardCreateCustomerPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardCreateCustomerPage = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title="Dashboard Create Customer">
      <SectionContainer padded className="">
        <DashboardLayout title={t("models.customer.title")}>
          <CreateCustomerForm />
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardCreateCustomerPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardCreateCustomerPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
