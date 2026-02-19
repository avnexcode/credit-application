import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { EditGuarantorForm } from "../../forms";

type DashboardEditGuarantorPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardEditGuarantorPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: guarantor, isLoading: isGuarantorLoading } =
    api.guarantor.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer title="Dashboard Guarantor">
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.guarantor.title")}
          className="space-y-5"
        >
          {isGuarantorLoading ? (
            <>Loading...</>
          ) : (
            guarantor && <EditGuarantorForm guarantor={guarantor} />
          )}
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardEditGuarantorPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardEditGuarantorPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
