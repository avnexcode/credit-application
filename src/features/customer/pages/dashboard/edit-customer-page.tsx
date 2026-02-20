import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api, capitalizeWords } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { EditCustomerForm } from "../../forms";

type DashboardEditCustomerPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardEditCustomerPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: customer, isLoading: isCustomerLoading } =
    api.customer.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.customer.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.customer.title")}
          className="space-y-5"
        >
          {isCustomerLoading ? (
            <>Loading...</>
          ) : (
            customer && <EditCustomerForm customer={customer} />
          )}
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardEditCustomerPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardEditCustomerPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
