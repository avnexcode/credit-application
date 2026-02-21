import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { capitalizeWords } from "@/utils";
import { useTranslation } from "react-i18next";
import { CreateInterviewQuestionForm } from "../../forms";

type DashboardCreateInterviewQuestionPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardCreateInterviewQuestionPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.interviewQuestion.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.interviewQuestion.title")}
          className="space-y-5"
        >
          <CreateInterviewQuestionForm />
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardCreateInterviewQuestionPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardCreateInterviewQuestionPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
