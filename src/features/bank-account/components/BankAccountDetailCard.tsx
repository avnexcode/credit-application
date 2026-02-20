import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils";
import { useTranslation } from "react-i18next";
import type { BankAccountResponse } from "../types";

type BankAccountDetailCardProps = {
  bankAccount: BankAccountResponse;
};

export const BankAccountDetailCard = ({
  bankAccount,
}: BankAccountDetailCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full border-0 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Icon name="CreditCard" size={28} />
            </div>
            <div className="flex flex-col justify-between">
              <Heading size="h2" className="capitalize">
                {bankAccount.accountName}
              </Heading>
              <p className="text-muted-foreground text-sm">
                {bankAccount.accountNumber}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-2">
          {bankAccount.isPrimary && (
            <Badge variant="default" className="capitalize">
              {t("models.bankAccount.fields.isPrimary")}
            </Badge>
          )}
          {bankAccount.isVerified && (
            <Badge variant="secondary" className="capitalize">
              {t("models.bankAccount.fields.isVerified")}
            </Badge>
          )}
          {bankAccount.isActive ? (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            >
              {t("common.active")}
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            >
              {t("common.inactive")}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.bankAccount.fields.isPrimary")}
            </p>
            <p className="text-sm font-medium capitalize">
              {bankAccount.isPrimary ? t("common.yes") : t("common.no")}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.bankAccount.fields.isVerified")}
            </p>
            <p className="text-sm font-medium capitalize">
              {bankAccount.isVerified ? t("common.yes") : t("common.no")}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.bankAccount.fields.isActive")}
            </p>
            <p className="text-sm font-medium capitalize">
              {bankAccount.isActive ? t("common.yes") : t("common.no")}
            </p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.bankAccount.fields.createdAt")}
            </p>
            <p className="text-sm font-medium">
              {formatDate(bankAccount.createdAt)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {t("models.bankAccount.fields.updatedAt")}
            </p>
            <p className="text-sm font-medium">
              {formatDate(bankAccount.updatedAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
