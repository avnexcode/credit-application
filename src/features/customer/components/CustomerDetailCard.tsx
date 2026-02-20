import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getGender, getMaritalStatus } from "@/lib/get-enum-label";
import { formatDate } from "@/utils";
import { useTranslation } from "react-i18next";
import type { CustomerResponse } from "../types";

type CustomerDetailCardProps = {
  customer: CustomerResponse;
};

export const CustomerDetailCard = ({ customer }: CustomerDetailCardProps) => {
  const { t } = useTranslation();

  const initials = customer.fullName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="w-full border-0 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-500 font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between">
              <Heading size="h2" className="capitalize">
                {customer.fullName}
              </Heading>
              <p className="text-muted-foreground text-sm">
                {t("models.customer.fields.nationalId")}: {customer.nationalId}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-2">
          {customer.gender && (
            <Badge variant="secondary" className="capitalize">
              {getGender({ gender: customer.gender })}
            </Badge>
          )}
          {customer.maritalStatus && (
            <Badge variant="secondary" className="capitalize">
              {getMaritalStatus({ maritalStatus: customer.maritalStatus })}
            </Badge>
          )}
          {customer.age && (
            <Badge variant="secondary">
              {customer.age} {t("common.years")}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.customer.fields.phone")}
            </p>
            <p className="text-sm font-medium">{customer.phone || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.customer.fields.email")}
            </p>
            <p className="truncate text-sm font-medium">
              {customer.email || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.customer.fields.birthPlace")}
            </p>
            <p className="text-sm font-medium capitalize">
              {customer.birthPlace || "-"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.customer.fields.birthDate")}
            </p>
            <p className="text-sm font-medium">
              {customer.birthDate ? formatDate(customer.birthDate) : "-"}
            </p>
          </div>
        </div>

        {customer.address && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs font-medium uppercase">
                {t("models.customer.fields.address")}
              </p>
              <p className="text-sm">{customer.address}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
