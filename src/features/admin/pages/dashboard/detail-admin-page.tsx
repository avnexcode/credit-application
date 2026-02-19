import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DashboardLayout } from "@/features/dashboard/components/layouts";
import { api } from "@/utils";
import { formatDate } from "@/utils";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  AdminDetailCard,
  DetailRow,
  DetailSection,
  DeleteAdminButton,
} from "../../components";
import { getGender, getMaritalStatus } from "../../utils";

type DashboardDetailAdminPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardDetailAdminPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: admin, isLoading: isAdminLoading } = api.admin.getById.useQuery(
    { id },
    { enabled: !!id },
  );

  if (isAdminLoading) {
    return (
      <PageContainer title={t("pages.admin.detail.title")}>
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.admin.title")}
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

  if (!admin) {
    return (
      <PageContainer title={t("pages.admin.detail.title")}>
        <SectionContainer padded>
          <DashboardLayout
            title={t("models.admin.title")}
            className="space-y-5"
          >
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-muted-foreground">
                {t("pages.admin.detail.notFound")}
              </p>
              <Button asChild>
                <Link href="/dashboard/admin">
                  {t("pages.admin.detail.backButton")}
                </Link>
              </Button>
            </div>
          </DashboardLayout>
        </SectionContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t("pages.admin.detail.title")}>
      <SectionContainer padded>
        <DashboardLayout title={t("models.admin.title")} className="space-y-5">
          {/* Admin Header Card */}
          <AdminDetailCard admin={admin} />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button asChild>
              <Link href={`/dashboard/admin/${id}/edit`}>
                {t("pages.admin.detail.editButton")}
              </Link>
            </Button>
            <DeleteAdminButton adminId={id} />
          </div>

          {/* Data Pribadi Section */}
          <DetailSection
            title={t("pages.admin.detail.personalDataLabel")}
            icon="User"
          >
            <DetailRow
              label={t("models.admin.fields.fullName")}
              value={admin.fullName}
            />
            <DetailRow
              label={t("models.admin.fields.nationalId")}
              value={admin.nationalId}
            />
            <DetailRow
              label={t("models.admin.fields.gender")}
              value={getGender({ gender: admin.gender })}
            />
            <DetailRow
              label={t("models.admin.fields.birthDate")}
              value={admin.birthDate ? formatDate(admin.birthDate) : undefined}
            />
            <DetailRow
              label={t("models.admin.fields.age")}
              value={
                admin.age ? `${admin.age} ${t("common.years")}` : undefined
              }
            />
            <DetailRow
              label={t("models.admin.fields.maritalStatus")}
              value={getMaritalStatus({
                maritalStatus: admin.maritalStatus,
              })}
            />
            <div className="md:col-span-2">
              <DetailRow
                label={t("models.admin.fields.birthPlace")}
                value={admin.birthPlace}
              />
            </div>
            <div className="md:col-span-2">
              <DetailRow
                label={t("models.admin.fields.address")}
                value={admin.address}
              />
            </div>
          </DetailSection>

          {/* Data Kontak Section */}
          <DetailSection
            title={t("pages.admin.detail.contactDataLabel")}
            icon="Phone"
          >
            <DetailRow
              label={t("models.admin.fields.phone")}
              value={admin.phone}
            />
            <DetailRow
              label={t("models.admin.fields.email")}
              value={admin.email}
            />
          </DetailSection>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardDetailAdminPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardDetailAdminPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
