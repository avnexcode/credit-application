import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { capitalizeWords } from "@/utils";
import { useTranslation } from "react-i18next";
import { CreateCustomerForm } from "../../forms";

type DashboardCreateCustomerPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardCreateCustomerPage = () => {
  const { t } = useTranslation();
  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.customer.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.customer.title")}
          className="space-y-5"
        >
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
