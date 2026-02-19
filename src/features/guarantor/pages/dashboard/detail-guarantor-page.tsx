import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api } from "@/utils";
import { formatDate } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  GuarantorDetailCard,
  DeleteGuarantorButton,
} from "../../components";
import {
  DetailRow,
  DetailSection,
} from "@/features/customer/components";
import {
  getEmploymentType,
  getGender,
  getMaritalStatus,
  getRelationship,
} from "../../utils";

type DashboardDetailGuarantorPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardDetailGuarantorPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: guarantor, isLoading: isGuarantorLoading } =
    api.guarantor.getById.useQuery({ id }, { enabled: !!id });

  if (isGuarantorLoading) {
    return (
      <PageContainer title={t("pages.guarantor.detail.title")}>
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.guarantor.title")}
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

  if (!guarantor) {
    return (
      <PageContainer title={t("pages.guarantor.detail.title")}>
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.guarantor.title")}
            className="space-y-5"
          >
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-muted-foreground">
                {t("pages.guarantor.detail.notFound")}
              </p>
              <Button asChild>
                <Link href="/dashboard/guarantor">
                  {t("pages.guarantor.detail.backButton")}
                </Link>
              </Button>
            </div>
          </DashboardLayout>
        </SectionContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t("pages.guarantor.detail.title")}>
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.guarantor.title")}
          className="space-y-5"
        >
          {/* Guarantor Header Card */}
          <GuarantorDetailCard guarantor={guarantor} />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button asChild>
              <Link href={`/dashboard/guarantor/${id}/edit`}>
                {t("pages.guarantor.detail.editButton")}
              </Link>
            </Button>
            <DeleteGuarantorButton guarantorId={id} />
          </div>

          {/* Data Pribadi Section */}
          <DetailSection
            title={t("pages.guarantor.detail.personalDataLabel")}
            icon="User"
          >
            <DetailRow
              label={t("models.guarantor.fields.fullName")}
              value={guarantor.fullName}
            />
            <DetailRow
              label={t("models.guarantor.fields.nationalId")}
              value={guarantor.nationalId}
            />
            <DetailRow
              label={t("models.guarantor.fields.gender")}
              value={getGender({ gender: guarantor.gender })}
            />
            <DetailRow
              label={t("models.guarantor.fields.birthDate")}
              value={
                guarantor.birthDate
                  ? formatDate(guarantor.birthDate)
                  : undefined
              }
            />
            <DetailRow
              label={t("models.guarantor.fields.age")}
              value={
                guarantor.age
                  ? `${guarantor.age} ${t("common.years")}`
                  : undefined
              }
            />
            <DetailRow
              label={t("models.guarantor.fields.maritalStatus")}
              value={getMaritalStatus({
                maritalStatus: guarantor.maritalStatus,
              })}
            />
            <div className="md:col-span-2">
              <DetailRow
                label={t("models.guarantor.fields.address")}
                value={guarantor.address}
              />
            </div>
          </DetailSection>

          {/* Data Pekerjaan Section */}
          <DetailSection
            title={t("pages.guarantor.detail.employmentDataLabel")}
            icon="Briefcase"
          >
            <DetailRow
              label={t("models.guarantor.fields.employmentType")}
              value={getEmploymentType({
                employmentType: guarantor.employmentType,
              })}
            />
            <DetailRow
              label={t("models.guarantor.fields.employmentPeriod")}
              value={
                guarantor.employmentPeriod
                  ? `${guarantor.employmentPeriod} ${t("common.years")}`
                  : undefined
              }
            />
            <div className="md:col-span-2">
              <DetailRow
                label={t("models.guarantor.fields.employmentName")}
                value={guarantor.employmentName}
              />
            </div>
          </DetailSection>

          {/* Relationship Section */}
          <DetailSection
            title={t("pages.guarantor.detail.relationshipLabel")}
            icon="Users"
          >
            <DetailRow
              label={t("models.guarantor.fields.relationship")}
              value={getRelationship({
                relationship: guarantor.relationship,
              })}
            />
            <DetailRow
              label={t("models.guarantor.fields.phone")}
              value={guarantor.phone}
            />
            <DetailRow
              label={t("models.guarantor.fields.email")}
              value={guarantor.email}
            />
            <DetailRow
              label={t("models.guarantor.fields.birthPlace")}
              value={guarantor.birthPlace}
            />
          </DetailSection>

          {/* Timestamps */}
          <div className="text-muted-foreground flex flex-col gap-2 text-xs">
            <p>
              {t("common.createdAt")}: {formatDate(guarantor.createdAt)}
            </p>
            <p>
              {t("common.updatedAt")}: {formatDate(guarantor.updatedAt)}
            </p>
          </div>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardDetailGuarantorPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardDetailGuarantorPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
