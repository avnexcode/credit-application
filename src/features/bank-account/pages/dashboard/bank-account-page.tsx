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
import { BankAccountTable } from "../../tables";

type DashboardBankAccountPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardBankAccountPage = () => {
  const { t } = useTranslation();
  const { queryParams, handleUpdateQuery } = useQueryParams();

  const { data: bankAccounts, isLoading: isBankAccountsLoading } =
    api.bankAccount.getAll.useQuery({ params: { ...queryParams } });

  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.bankAccount.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.bankAccount.title")}
          className="space-y-5"
        >
          <header>
            <div className="flex w-full items-center justify-start gap-x-2 px-3">
              <Button asChild>
                <Link
                  href={`${env.NEXT_PUBLIC_BASE_URL}/dashboard/bank-account/create`}
                >
                  <Icon name="CirclePlus" /> Add Bank Account
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
            {!isBankAccountsLoading ? (
              <BankAccountTable bankAccounts={bankAccounts} />
            ) : (
              <DataTableSkeleton
                rowCount={queryParams.limit}
                columnCount={6}
                filterCount={0}
                cellWidths={[
                  "3rem",
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

DashboardBankAccountPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardBankAccountPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
