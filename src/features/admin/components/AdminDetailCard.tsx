import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getGender, getMaritalStatus } from "@/lib/get-enum-label";
import { formatDate } from "@/utils";
import { useTranslation } from "react-i18next";
import type { AdminResponse } from "../types";

type AdminDetailCardProps = {
  admin: AdminResponse;
};

export const AdminDetailCard = ({ admin }: AdminDetailCardProps) => {
  const { t } = useTranslation();

  const initials = admin.fullName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="w-full border-0 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-purple-500 font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between">
              <Heading size="h2" className="capitalize">
                {admin.fullName}
              </Heading>
              <p className="text-muted-foreground text-sm">
                {t("models.admin.fields.nationalId")}: {admin.nationalId || "-"}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-2">
          {admin.gender && (
            <Badge variant="secondary" className="capitalize">
              {getGender({ gender: admin.gender })}
            </Badge>
          )}
          {admin.maritalStatus && (
            <Badge variant="secondary" className="capitalize">
              {getMaritalStatus({ maritalStatus: admin.maritalStatus })}
            </Badge>
          )}
          {admin.age && (
            <Badge variant="secondary">
              {admin.age} {t("common.years")}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.admin.fields.phone")}
            </p>
            <p className="text-sm font-medium">{admin.phone || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.admin.fields.email")}
            </p>
            <p className="truncate text-sm font-medium">{admin.email || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.admin.fields.birthPlace")}
            </p>
            <p className="text-sm font-medium capitalize">
              {admin.birthPlace || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.admin.fields.birthDate")}
            </p>
            <p className="text-sm font-medium">
              {admin.birthDate ? formatDate(admin.birthDate) : "-"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
