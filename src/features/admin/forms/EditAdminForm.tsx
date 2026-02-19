import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateAdmin } from "../hooks";
import type { AdminResponse } from "../types";
import { EditAdminFormInner } from "./EditAdminFormInner";

type EditAdminFormProps = {
  admin: AdminResponse;
};

export const EditAdminForm = ({ admin }: EditAdminFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit, hasChanges, isPending, defaultUrl } =
    useUpdateAdmin(admin);

  return (
    <Card className="w-full rounded-none border-0 bg-transparent p-0 shadow-none">
      <CardContent>
        <FormProvider {...form}>
          <EditAdminFormInner formId="update-admin-form" onSubmit={onSubmit} />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex-col-reverse place-content-end gap-4 pt-5 xl:flex-row">
        <Button variant={"secondary"} className="w-full px-20 xl:w-fit" asChild>
          <Link href={defaultUrl}>
            {t("pages.admin.forms.update.footer.cancelButton")}
          </Link>
        </Button>
        <Button
          form="update-admin-form"
          className="w-full px-20 xl:w-fit"
          disabled={isPending || !hasChanges}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.admin.forms.update.footer.submitButtonLoading")} . . .
            </>
          ) : (
            t("pages.admin.forms.update.footer.submitButton")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
