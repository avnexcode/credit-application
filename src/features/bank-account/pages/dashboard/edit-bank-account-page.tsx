import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api, capitalizeWords } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { EditBankAccountForm } from "../../forms";

type DashboardEditBankAccountPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardEditBankAccountPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: bankAccount, isLoading: isBankAccountLoading } =
    api.bankAccount.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.bankAccount.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout title={t("models.bankAccount.title")}>
          {isBankAccountLoading ? (
            <>Loading...</>
          ) : (
            bankAccount && <EditBankAccountForm bankAccount={bankAccount} />
          )}
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardEditBankAccountPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardEditBankAccountPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
