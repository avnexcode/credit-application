import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createBankAccountFormSchema } from "../schemas";
import type { CreateBankAccountFormSchema } from "../types";

export const useCreateBankAccount =
  (): MutateFunctionReturn<CreateBankAccountFormSchema> => {
    const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/bank-account`;
    const router = useRouter();
    const { t } = useTranslation();

    const form = useForm<CreateBankAccountFormSchema>({
      defaultValues: {
        accountName: "",
        accountNumber: "",
      } satisfies DefaultValues<CreateBankAccountFormSchema>,
      resolver: zodResolver(createBankAccountFormSchema(t)),
    });

    const apiBankAccountUtils = api.useUtils().bankAccount;

    const { mutate: createBankAccount, isPending: isCreateBankAccountPending } =
      api.bankAccount.create.useMutation({
        onSuccess: () => {
          form.reset();
          void apiBankAccountUtils.getAll.invalidate();
          void router.push(defaultUrl);
          toast.success(
            capitalizeSentence(
              t("successes.message.create", {
                field: t("models.bankAccount.title"),
              }),
            ),
          );
        },
        onError: (error) => {
          toast.success(
            error.message ||
              capitalizeSentence(
                t("errors.messages.create", {
                  field: t("models.bankAccount.title"),
                }),
              ),
          );
        },
      });

    const onSubmit = (values: CreateBankAccountFormSchema) => {
      createBankAccount({ request: { ...values } });
    };

    return {
      form,
      onSubmit,
      isPending: isCreateBankAccountPending,
      defaultUrl,
    };
  };
