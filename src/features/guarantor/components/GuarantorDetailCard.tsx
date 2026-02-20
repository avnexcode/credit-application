import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getGender, getMaritalStatus } from "@/lib/get-enum-label";
import { formatDate } from "@/utils";
import { useTranslation } from "react-i18next";
import type { GuarantorResponse } from "../types";

type GuarantorDetailCardProps = {
  guarantor: GuarantorResponse;
};

export const GuarantorDetailCard = ({
  guarantor,
}: GuarantorDetailCardProps) => {
  const { t } = useTranslation();

  const initials = guarantor.fullName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="w-full border-0 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-amber-500 font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between">
              <Heading size="h2" className="capitalize">
                {guarantor.fullName}
              </Heading>
              <p className="text-muted-foreground text-sm">
                {t("models.guarantor.fields.nationalId")}:{" "}
                {guarantor.nationalId}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-2">
          {guarantor.gender && (
            <Badge variant="secondary" className="capitalize">
              {getGender({ gender: guarantor.gender })}
            </Badge>
          )}
          {guarantor.maritalStatus && (
            <Badge variant="secondary" className="capitalize">
              {getMaritalStatus({ maritalStatus: guarantor.maritalStatus })}
            </Badge>
          )}
          {guarantor.age && (
            <Badge variant="secondary">
              {guarantor.age} {t("common.years")}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.guarantor.fields.phone")}
            </p>
            <p className="text-sm font-medium">{guarantor.phone || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.guarantor.fields.email")}
            </p>
            <p className="truncate text-sm font-medium">
              {guarantor.email || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.guarantor.fields.birthPlace")}
            </p>
            <p className="text-sm font-medium capitalize">
              {guarantor.birthPlace || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.guarantor.fields.birthDate")}
            </p>
            <p className="text-sm font-medium">
              {guarantor.birthDate ? formatDate(guarantor.birthDate) : "-"}
            </p>
          </div>
        </div>

        {guarantor.address && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs font-medium uppercase">
                {t("models.guarantor.fields.address")}
              </p>
              <p className="text-sm">{guarantor.address}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
