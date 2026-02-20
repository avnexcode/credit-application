import { env } from "@/configs/env";
import type { DeleteFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteManyBankAccounts = (): DeleteFunctionReturn<{
  ids: string[];
}> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/bank-account`;
  const router = useRouter();
  const { t } = useTranslation();

  const apiBankAccountUtils = api.useUtils().bankAccount;

  const { mutate: deleteBankAccounts, isPending: isDeleteBankAccountsPending } =
    api.bankAccount.deleteMany.useMutation({
      onSuccess: () => {
        void apiBankAccountUtils.getAll.invalidate();
        void router.push(defaultUrl);
        toast.success(
          capitalizeSentence(
            t("successes.message.delete", {
              field: t("models.bankAccount.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.delete", {
                field: t("models.bankAccount.title"),
              }),
            ),
        );
      },
    });

  const onDelete = (values: { ids: string[] }) => {
    deleteBankAccounts({ request: { ids: values.ids } });
  };

  return { onDelete, isPending: isDeleteBankAccountsPending, defaultUrl };
};
