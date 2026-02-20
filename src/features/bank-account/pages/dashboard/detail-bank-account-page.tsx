import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api, capitalizeWords, formatDate } from "@/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  BankAccountDetailCard,
  DeleteBankAccountButton,
  DetailRow,
  DetailSection,
} from "../../components";

type DashboardDetailBankAccountPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardDetailBankAccountPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: bankAccount, isLoading: isBankAccountLoading } =
    api.bankAccount.getById.useQuery({ id }, { enabled: !!id });

  if (isBankAccountLoading) {
    return (
      <PageContainer
        title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.bankAccount.title"))}`}
      >
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.bankAccount.title")}
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

  if (!bankAccount) {
    return (
      <PageContainer title={t("pages.bankAccount.detail.title")}>
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.bankAccount.title")}
            className="space-y-5"
          >
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-muted-foreground">
                {t("pages.bankAccount.detail.notFound")}
              </p>
              <Button asChild>
                <Link href="/dashboard/bank-account">
                  {t("pages.bankAccount.detail.backButton")}
                </Link>
              </Button>
            </div>
          </DashboardLayout>
        </SectionContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t("pages.bankAccount.detail.title")}>
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.bankAccount.title")}
          className="space-y-5"
        >
          {/* Bank Account Header Card */}
          <BankAccountDetailCard bankAccount={bankAccount} />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button asChild>
              <Link href={`/dashboard/bank-account/${id}/edit`}>
                {t("pages.bankAccount.detail.editButton")}
              </Link>
            </Button>
            <DeleteBankAccountButton bankAccountId={id} />
          </div>

          {/* Account Details Section */}
          <DetailSection
            title={t("pages.bankAccount.detail.accountDetailsLabel")}
            icon="CreditCard"
          >
            <DetailRow
              label={t("models.bankAccount.fields.accountName")}
              value={bankAccount.accountName}
            />
            <DetailRow
              label={t("models.bankAccount.fields.accountNumber")}
              value={bankAccount.accountNumber}
            />
            <DetailRow
              label={t("models.bankAccount.fields.isPrimary")}
              value={bankAccount.isPrimary ? t("common.yes") : t("common.no")}
            />
            <DetailRow
              label={t("models.bankAccount.fields.isVerified")}
              value={bankAccount.isVerified ? t("common.yes") : t("common.no")}
            />
            <DetailRow
              label={t("models.bankAccount.fields.isActive")}
              value={bankAccount.isActive ? t("common.yes") : t("common.no")}
            />
          </DetailSection>

          {/* Status Section */}
          <div className="space-y-4 rounded-lg border bg-blue-50 p-4 dark:bg-blue-950">
            <h3 className="text-base font-semibold capitalize">
              {t("pages.bankAccount.detail.statusLabel")}
            </h3>
            <Separator />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="flex items-center justify-between rounded-lg border bg-white p-3 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${bankAccount.isPrimary ? "bg-purple-100 dark:bg-purple-900/30" : "bg-gray-100 dark:bg-gray-900/30"}`}
                  >
                    <span
                      className={`text-xs ${bankAccount.isPrimary ? "text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-400"}`}
                    >
                      {bankAccount.isPrimary ? "✓" : "○"}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {t("pages.bankAccount.detail.status.primary")}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium ${bankAccount.isPrimary ? "text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-400"}`}
                >
                  {bankAccount.isPrimary ? t("common.yes") : t("common.no")}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border bg-white p-3 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${bankAccount.isVerified ? "bg-green-100 dark:bg-green-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"}`}
                  >
                    <span
                      className={`text-xs ${bankAccount.isVerified ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}`}
                    >
                      {bankAccount.isVerified ? "✓" : "⧗"}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {t("pages.bankAccount.detail.status.verified")}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium ${bankAccount.isVerified ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}`}
                >
                  {bankAccount.isVerified
                    ? t("common.verified")
                    : t("common.pending")}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border bg-white p-3 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${bankAccount.isActive ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                  >
                    <span
                      className={`text-xs ${bankAccount.isActive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {bankAccount.isActive ? "✓" : "✕"}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {t("pages.bankAccount.detail.status.active")}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium ${bankAccount.isActive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {bankAccount.isActive
                    ? t("common.active")
                    : t("common.inactive")}
                </span>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="text-muted-foreground flex flex-col gap-2 text-xs">
            <p>
              {t("common.createdAt")}: {formatDate(bankAccount.createdAt)}
            </p>
            <p>
              {t("common.updatedAt")}: {formatDate(bankAccount.updatedAt)}
            </p>
          </div>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardDetailBankAccountPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardDetailBankAccountPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
