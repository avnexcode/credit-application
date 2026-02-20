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
import { AdminTable } from "../../tables";

type DashboardAdminPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardAdminPage = () => {
  const { t } = useTranslation();
  const { queryParams, handleUpdateQuery } = useQueryParams();

  const { data: admins, isLoading: isAdminsLoading } =
    api.admin.getAll.useQuery({ params: { ...queryParams } });

  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} ${capitalizeWords(t("models.admin.title"))}`}
    >
      <SectionContainer padded>
        <DashboardLayout title={t("models.admin.title")} className="space-y-5">
          <header>
            <div className="flex w-full items-center justify-start gap-x-2 px-3">
              <Button asChild>
                <Link
                  href={`${env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/create`}
                >
                  <Icon name="CirclePlus" /> Add Admin
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
            {!isAdminsLoading ? (
              <AdminTable admins={admins} />
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

DashboardAdminPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardAdminPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
