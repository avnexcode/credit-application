import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateGuarantor } from "../hooks";
import { CreateGuarantorFormInner } from "./CreateGuarantorFormInner";

export const CreateGuarantorForm = () => {
  const { t } = useTranslation();
  const { form, onSubmit, isPending, defaultUrl } = useCreateGuarantor();

  return (
    <Card className="w-full rounded-none border-0 bg-transparent p-0 shadow-none">
      <CardContent>
        <FormProvider {...form}>
          <CreateGuarantorFormInner
            formId="create-guarantor-form"
            onSubmit={onSubmit}
          />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex-col-reverse place-content-end gap-4 pt-5 xl:flex-row">
        <Button variant={"secondary"} className="w-full px-20 xl:w-fit" asChild>
          <Link href={defaultUrl}>
            {t("pages.guarantor.forms.create.footer.cancelButton")}
          </Link>
        </Button>
        <Button
          form="create-guarantor-form"
          className="w-full px-20 xl:w-fit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.guarantor.forms.create.footer.submitButtonLoading")} . .
              .
            </>
          ) : (
            t("pages.guarantor.forms.create.footer.submitButton")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
