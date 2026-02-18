import { env } from "@/configs/env";
import type { DeleteFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteCustomer = (): DeleteFunctionReturn<{ id: string }> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/customer`;
  const router = useRouter();
  const { t } = useTranslation();

  const apiCustomerUtils = api.useUtils().customer;

  const { mutate: deleteCustomer, isPending: isDeleteCustomerPending } =
    api.customer.delete.useMutation({
      onSuccess: () => {
        void apiCustomerUtils.getAll.invalidate();
        void router.push(defaultUrl);
        toast.success(
          capitalizeSentence(
            t("successes.message.delete", {
              field: t("models.customer.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.delete", {
                field: t("models.customer.title"),
              }),
            ),
        );
      },
    });

  const onDelete = (values: { id: string }) => {
    deleteCustomer({ request: { id: values.id } });
  };

  return { onDelete, isPending: isDeleteCustomerPending, defaultUrl };
};
