import { env } from "@/configs/env";
import type { DeleteFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteGuarantor = (): DeleteFunctionReturn<{ id: string }> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/guarantor`;
  const router = useRouter();
  const { t } = useTranslation();

  const apiGuarantorUtils = api.useUtils().guarantor;

  const { mutate: deleteGuarantor, isPending: isDeleteGuarantorPending } =
    api.guarantor.delete.useMutation({
      onSuccess: () => {
        void apiGuarantorUtils.getAll.invalidate();
        void router.push(defaultUrl);
        toast.success(
          capitalizeSentence(
            t("successes.message.delete", {
              field: t("models.guarantor.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.delete", {
                field: t("models.guarantor.title"),
              }),
            ),
        );
      },
    });

  const onDelete = (values: { id: string }) => {
    deleteGuarantor({ request: { id: values.id } });
  };

  return { onDelete, isPending: isDeleteGuarantorPending, defaultUrl };
};
