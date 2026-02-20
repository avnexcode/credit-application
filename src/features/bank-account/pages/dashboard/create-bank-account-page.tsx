import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { capitalizeWords } from "@/utils";
import { useTranslation } from "react-i18next";
import { CreateBankAccountForm } from "../../forms";

type DashboardCreateBankAccountPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardCreateBankAccountPage = () => {
  const { t } = useTranslation();
  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.bankAccount.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout title={t("models.bankAccount.title")}>
          <CreateBankAccountForm />
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardCreateBankAccountPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardCreateBankAccountPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
