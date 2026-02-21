import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api, capitalizeWords } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { EditInterviewQuestionForm } from "../../forms";

type DashboardEditInterviewQuestionPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardEditInterviewQuestionPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: interviewQuestion, isLoading: isInterviewQuestionLoading } =
    api.interviewQuestion.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.interviewQuestion.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.interviewQuestion.title")}
          className="space-y-5"
        >
          {isInterviewQuestionLoading ? (
            <>Loading...</>
          ) : (
            interviewQuestion && (
              <EditInterviewQuestionForm
                interviewQuestion={interviewQuestion}
              />
            )
          )}
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardEditInterviewQuestionPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardEditInterviewQuestionPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
