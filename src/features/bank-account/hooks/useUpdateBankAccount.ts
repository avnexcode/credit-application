import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { updateBankAccountFormSchema } from "../schemas";
import type {
  BankAccountResponse,
  UpdateBankAccountFormSchema,
} from "../types";

export const useUpdateBankAccount = (
  bankAccount: BankAccountResponse,
): MutateFunctionReturn<UpdateBankAccountFormSchema> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/bank-account`;
  const router = useRouter();
  const { t } = useTranslation();
  const [hasBankAccountChanges, setHasBankAccountChanges] = useState(false);
  const [initialData, setInitialData] =
    useState<UpdateBankAccountFormSchema | null>(null);

  const form = useForm<UpdateBankAccountFormSchema>({
    defaultValues: {
      accountName: bankAccount?.accountName,
      accountNumber: bankAccount?.accountNumber,
      customerId: bankAccount?.customerId,
    } satisfies DefaultValues<UpdateBankAccountFormSchema>,
    resolver: zodResolver(updateBankAccountFormSchema(t)),
  });

  useEffect(() => {
    const initBankAccountValues = {
      accountName: bankAccount?.accountName,
      accountNumber: bankAccount?.accountNumber,
      customerId: bankAccount?.customerId,
    };

    setInitialData(initBankAccountValues);
    form.reset(initBankAccountValues);
  }, [bankAccount, form]);

  const watchedValues = form.watch();

  useEffect(() => {
    if (initialData) {
      const hasChanges =
        JSON.stringify(watchedValues) !== JSON.stringify(initialData);
      setHasBankAccountChanges(hasChanges);
    }
  }, [watchedValues, initialData]);

  const apiBankAccountUtils = api.useUtils().bankAccount;

  const { mutate: updateBankAccount, isPending: isUpdateBankAccountPending } =
    api.bankAccount.update.useMutation({
      onSuccess: () => {
        form.reset();
        void apiBankAccountUtils.getAll.invalidate();
        void router.push(defaultUrl);
        toast.success(
          capitalizeSentence(
            t("successes.message.update", {
              field: t("models.bankAccount.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.update", {
                field: t("models.bankAccount.title"),
              }),
            ),
        );
      },
    });

  const onSubmit = (values: UpdateBankAccountFormSchema) => {
    updateBankAccount({
      id: bankAccount.id,
      request: { ...values },
    });
  };

  return {
    form,
    onSubmit,
    hasChanges: hasBankAccountChanges,
    isPending: isUpdateBankAccountPending,
    defaultUrl,
  };
};
