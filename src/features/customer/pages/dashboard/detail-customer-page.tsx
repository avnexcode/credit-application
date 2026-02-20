import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import {
  getEmploymentType,
  getGender,
  getMaritalStatus,
} from "@/lib/get-enum-label";
import { api, capitalizeWords, formatDate } from "@/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  CustomerDetailCard,
  DeleteCustomerButton,
  DetailRow,
  DetailSection,
} from "../../components";

type DashboardDetailCustomerPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardDetailCustomerPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: customer, isLoading: isCustomerLoading } =
    api.customer.getById.useQuery({ id }, { enabled: !!id });

  if (isCustomerLoading) {
    return (
      <PageContainer
        title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.customer.title"))}`}
      >
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.customer.title")}
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

  if (!customer) {
    return (
      <PageContainer title={t("pages.customer.detail.title")}>
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.customer.title")}
            className="space-y-5"
          >
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-muted-foreground">
                {t("pages.customer.detail.notFound")}
              </p>
              <Button asChild>
                <Link href="/dashboard/customer">
                  {t("pages.customer.detail.backButton")}
                </Link>
              </Button>
            </div>
          </DashboardLayout>
        </SectionContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t("pages.customer.detail.title")}>
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.customer.title")}
          className="space-y-5"
        >
          {/* Customer Header Card */}
          <CustomerDetailCard customer={customer} />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button asChild>
              <Link href={`/dashboard/customer/${id}/edit`}>
                {t("pages.customer.detail.editButton")}
              </Link>
            </Button>
            <DeleteCustomerButton customerId={id} />
          </div>

          {/* Data Pribadi Section */}
          <DetailSection
            title={t("pages.customer.detail.personalDataLabel")}
            icon="User"
          >
            <DetailRow
              label={t("models.customer.fields.fullName")}
              value={customer.fullName}
            />
            <DetailRow
              label={t("models.customer.fields.nationalId")}
              value={customer.nationalId}
            />
            <DetailRow
              label={t("models.customer.fields.gender")}
              value={getGender({ gender: customer.gender })}
            />
            <DetailRow
              label={t("models.customer.fields.birthDate")}
              value={
                customer.birthDate ? formatDate(customer.birthDate) : undefined
              }
            />
            <DetailRow
              label={t("models.customer.fields.age")}
              value={
                customer.age
                  ? `${customer.age} ${t("common.years")}`
                  : undefined
              }
            />
            <DetailRow
              label={t("models.customer.fields.maritalStatus")}
              value={getMaritalStatus({
                maritalStatus: customer.maritalStatus,
              })}
            />
            <div className="md:col-span-2">
              <DetailRow
                label={t("models.customer.fields.address")}
                value={customer.address}
              />
            </div>
          </DetailSection>

          {/* Data Pekerjaan Section */}
          <DetailSection
            title={t("pages.customer.detail.employmentDataLabel")}
            icon="Briefcase"
          >
            <DetailRow
              label={t("models.customer.fields.employmentType")}
              value={getEmploymentType({
                employmentType: customer.employmentType,
              })}
            />
            <DetailRow
              label={t("models.customer.fields.employmentPeriod")}
              value={
                customer.employmentPeriod
                  ? `${customer.employmentPeriod} ${t("common.years")}`
                  : undefined
              }
            />
            <div className="md:col-span-2">
              <DetailRow
                label={t("models.customer.fields.employmentName")}
                value={customer.employmentName}
              />
            </div>
          </DetailSection>

          {/* Document Section */}
          <div className="space-y-4 rounded-lg border bg-blue-50 p-4 dark:bg-blue-950">
            <h3 className="text-base font-semibold capitalize">
              {t("pages.customer.detail.documentsLabel")}
            </h3>
            <Separator />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border bg-white p-3 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <span className="text-xs text-green-600 dark:text-green-400">
                      ✓
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {t("pages.customer.detail.documents.ktp")}
                  </span>
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  {t("pages.customer.detail.documents.uploaded")}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-white p-3 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      ◯
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {t("pages.customer.detail.documents.familyCard")}
                  </span>
                </div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {t("pages.customer.detail.documents.notUploaded")}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-white p-3 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <span className="text-xs text-green-600 dark:text-green-400">
                      ✓
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {t("pages.customer.detail.documents.selfie")}
                  </span>
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  {t("pages.customer.detail.documents.uploaded")}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-white p-3 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      ◯
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {t("pages.customer.detail.documents.payslip")}
                  </span>
                </div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {t("pages.customer.detail.documents.notUploaded")}
                </span>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="text-muted-foreground flex flex-col gap-2 text-xs">
            <p>
              {t("common.createdAt")}: {formatDate(customer.createdAt)}
            </p>
            <p>
              {t("common.updatedAt")}: {formatDate(customer.updatedAt)}
            </p>
          </div>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardDetailCustomerPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardDetailCustomerPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
