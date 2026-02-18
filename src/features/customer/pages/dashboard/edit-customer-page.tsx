import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useParams } from "next/navigation";
import { EditCustomerForm } from "../../forms";
import { api } from "@/utils";
import { useTranslation } from "react-i18next";

type DashboardEditCustomerPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardEditCustomerPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: customer, isLoading: isCustomerLoading } =
    api.customer.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardLayout title={t("models.customer.title")}>
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
