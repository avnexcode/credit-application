import { DataTableSkeleton } from "@/components/data-table";
import { TableSearch } from "@/components/fragments/table";
import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { env } from "@/configs/env";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { useQueryParams } from "@/hooks";
import { api, capitalizeWords } from "@/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { InterviewQuestionTable } from "../../tables";

type DashboardInterviewQuestionPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardInterviewQuestionPage = () => {
  const { t } = useTranslation();
  const { queryParams, handleUpdateQuery } = useQueryParams();

  const { data: interviewQuestions, isLoading: isInterviewQuestionsLoading } =
    api.interviewQuestion.getAll.useQuery({ params: { ...queryParams } });

  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.interviewQuestion.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.interviewQuestion.title")}
          className="space-y-5"
        >
          <header>
            <div className="flex w-full items-center justify-start gap-x-2 px-3">
              <Button asChild>
                <Link
                  href={`${env.NEXT_PUBLIC_BASE_URL}/dashboard/interview-question/create`}
                >
                  <Icon name="CirclePlus" /> Add Interview Question
                </Link>
              </Button>
              <TableSearch
                value={queryParams.search}
                onSearchChange={(search) =>
                  handleUpdateQuery({ search, page: 1 })
                }
                placeholder="Search (name, NIK)"
              />
            </div>
          </header>
          <main>
            {!isInterviewQuestionsLoading ? (
              <InterviewQuestionTable interviewQuestions={interviewQuestions} />
            ) : (
              <DataTableSkeleton
                rowCount={queryParams.limit}
                columnCount={7}
                filterCount={0}
                cellWidths={[
                  "3rem",
                  "10rem",
                  "10rem",
                  "10rem",
                  "10rem",
                  "10rem",
                  "3rem",
                ]}
                shrinkZero
              />
            )}
          </main>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardInterviewQuestionPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardInterviewQuestionPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
