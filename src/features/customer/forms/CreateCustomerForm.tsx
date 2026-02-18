import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateCustomer } from "../hooks";
import { CreateCustomerFormInner } from "./CreateCustomerFormInner";

export const CreateCustomerForm = () => {
  const { t } = useTranslation();
  const { form, onSubmit, isPending, defaultUrl } = useCreateCustomer();

  return (
    <Card className="w-full rounded-none border-0 bg-transparent p-0 shadow-none">
      <CardContent>
        <FormProvider {...form}>
          <CreateCustomerFormInner
            formId="create-customer-form"
            onSubmit={onSubmit}
          />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex-col-reverse place-content-end gap-4 pt-5 xl:flex-row">
        <Button variant={"secondary"} className="w-full px-20 xl:w-fit" asChild>
          <Link href={defaultUrl}>
            {t("pages.customer.forms.create.footer.cancelButton")}
          </Link>
        </Button>
        <Button
          form="create-customer-form"
          className="w-full px-20 xl:w-fit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("pages.customer.forms.create.footer.submitButtonLoading")} . .
              .
            </>
          ) : (
            t("pages.customer.forms.create.footer.submitButton")
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
