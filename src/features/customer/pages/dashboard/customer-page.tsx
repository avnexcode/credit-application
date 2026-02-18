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
import { api } from "@/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CustomerTable } from "../../tables";
import type { CustomerResponse } from "../../types";

export type CustomerSortParams = keyof CustomerResponse;
export type CustomerOrderParams = "asc" | "desc";

type DashboardCustomerPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardCustomerPage = () => {
  const { t } = useTranslation();
  const { queryParams, handleUpdateQuery } = useQueryParams();

  const { data: customers, isLoading: isCustomersLoading } =
    api.customer.getAll.useQuery({ params: { ...queryParams } });

  return (
    <PageContainer title="Dashboard Customer">
      <SectionContainer padded>
        <DashboardLayout
          title={t("models.customer.title")}
          className="space-y-5"
        >
          <header>
            <div className="flex w-full items-center justify-start gap-x-2 px-3">
              <Button asChild>
                <Link
                  href={`${env.NEXT_PUBLIC_BASE_URL}/dashboard/customer/create`}
                >
                  <Icon name="CirclePlus" /> Add Customer
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
            {!isCustomersLoading ? (
              <CustomerTable customers={customers} />
            ) : (
              <DataTableSkeleton
                rowCount={15}
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

DashboardCustomerPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardCustomerPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
