import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { DetailRow, DetailSection } from "@/features/admin/components";
import { api, capitalizeWords, formatDate } from "@/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  InterviewQuestionDetailCard,
  DeleteInterviewQuestionButton,
} from "../../components";

type DashboardDetailInterviewQuestionPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardDetailInterviewQuestionPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: interviewQuestion, isLoading: isInterviewQuestionLoading } =
    api.interviewQuestion.getById.useQuery({ id }, { enabled: !!id });

  if (isInterviewQuestionLoading) {
    return (
      <PageContainer
        title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.interviewQuestion.title"))}`}
      >
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.interviewQuestion.title")}
            className="space-y-5"
          >
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">{t("common.loading")}</p>
            </div>
          </DashboardLayout>
        </SectionContainer>
      </PageContainer>
    );
  }

  if (!interviewQuestion) {
    return (
      <PageContainer title={t("pages.interviewQuestion.detail.title")}>
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.interviewQuestion.title")}
            className="space-y-5"
          >
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-muted-foreground">
                {t("pages.interviewQuestion.detail.notFound")}
              </p>
              <Button asChild>
                <Link href="/dashboard/interview-question">
                  {t("pages.interviewQuestion.detail.backButton")}
                </Link>
              </Button>
            </div>
          </DashboardLayout>
        </SectionContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t("pages.interviewQuestion.detail.title")}>
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.interviewQuestion.title")}
          className="space-y-5"
        >
          {/* Interview Question Header Card */}
          <InterviewQuestionDetailCard interviewQuestion={interviewQuestion} />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button asChild>
              <Link href={`/dashboard/interview-question/${id}/edit`}>
                {t("pages.interviewQuestion.detail.editButton")}
              </Link>
            </Button>
            <DeleteInterviewQuestionButton interviewQuestionId={id} />
          </div>

          {/* Question Configuration Section */}
          <DetailSection
            title={t("pages.interviewQuestion.detail.configurationLabel")}
            icon="Settings"
          >
            <DetailRow
              label={t("models.interviewQuestion.fields.questionType")}
              value={t(
                `enums.questionType.${interviewQuestion.questionType.toLowerCase()}` as any,
              )}
            />
            <DetailRow
              label={t("models.interviewQuestion.fields.category")}
              value={
                interviewQuestion.category
                  ? t(
                      `enums.questionCategory.${interviewQuestion.category.toLowerCase()}` as any,
                    )
                  : "-"
              }
            />
            <DetailRow
              label={t("models.interviewQuestion.fields.isRequired")}
              value={
                interviewQuestion.isRequired ? t("common.yes") : t("common.no")
              }
            />
            <DetailRow
              label={t("models.interviewQuestion.fields.isActive")}
              value={
                interviewQuestion.isActive ? t("common.yes") : t("common.no")
              }
            />
            <DetailRow
              label={t("models.interviewQuestion.fields.orderNumber")}
              value={String(interviewQuestion.orderNumber)}
            />
          </DetailSection>

          {/* Content Section */}
          <DetailSection
            title={t("pages.interviewQuestion.detail.contentLabel")}
            icon="FileText"
          >
            <div className="md:col-span-2">
              <DetailRow
                label={t("models.interviewQuestion.fields.questionText")}
                value={interviewQuestion.questionText}
              />
            </div>
            {interviewQuestion.options &&
              interviewQuestion.options.length > 0 && (
                <div className="md:col-span-2">
                  <DetailRow
                    label={t("models.interviewQuestion.fields.options")}
                    value={
                      <div className="flex flex-wrap gap-2 pt-2">
                        {interviewQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className="bg-secondary rounded-md px-3 py-1 text-sm"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    }
                  />
                </div>
              )}
            {interviewQuestion.placeholder && (
              <div className="md:col-span-2">
                <DetailRow
                  label={t("models.interviewQuestion.fields.placeholder")}
                  value={interviewQuestion.placeholder}
                />
              </div>
            )}
          </DetailSection>

          {/* Metadata Section */}
          <DetailSection
            title={t("pages.interviewQuestion.detail.metadataLabel")}
            icon="Info"
          >
            <DetailRow
              label={t("common.createdAt")}
              value={formatDate(interviewQuestion.createdAt)}
            />
            <DetailRow
              label={t("common.updatedAt")}
              value={formatDate(interviewQuestion.updatedAt)}
            />
          </DetailSection>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardDetailInterviewQuestionPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardDetailInterviewQuestionPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
