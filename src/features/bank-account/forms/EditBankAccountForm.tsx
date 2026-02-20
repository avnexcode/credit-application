import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateBankAccount } from "../hooks";
import type { BankAccountResponse } from "../types";
import { EditBankAccountFormInner } from "./EditBankAccountFormInner";

type EditBankAccountFormProps = {
  bankAccount: BankAccountResponse;
};

export const EditBankAccountForm = ({
  bankAccount,
}: EditBankAccountFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit, isPending, defaultUrl } =
    useUpdateBankAccount(bankAccount);

  return (
    <Card className="w-full rounded-none border-0 bg-transparent p-0 shadow-none">
      <CardContent>
        <FormProvider {...form}>
          <EditBankAccountFormInner
            formId="update-bank-account-form"
            onSubmit={onSubmit}
          />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex-col-reverse place-content-end gap-4 pt-5 xl:flex-row">
        <Button variant={"secondary"} className="w-full px-20 xl:w-fit" asChild>
          <Link href={defaultUrl}>
            {t("pages.bankAccount.forms.update.footer.cancelButton")}
          </Link>
        </Button>
        <Button
          form="update-bank-account-form"
          className="w-full px-20 xl:w-fit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.bankAccount.forms.update.footer.submitButtonLoading")} .
              . .
            </>
          ) : (
            t("pages.bankAccount.forms.update.footer.submitButton")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
