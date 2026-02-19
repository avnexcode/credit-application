import { env } from "@/configs/env";
import type { DeleteFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteManyGuarantors = (): DeleteFunctionReturn<{
  ids: string[];
}> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/guarantor`;
  const router = useRouter();
  const { t } = useTranslation();

  const apiGuarantorUtils = api.useUtils().guarantor;

  const { mutate: deleteGuarantors, isPending: isDeleteGuarantorsPending } =
    api.guarantor.deleteMany.useMutation({
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

  const onDelete = (values: { ids: string[] }) => {
    deleteGuarantors({ request: { ids: values.ids } });
  };

  return { onDelete, isPending: isDeleteGuarantorsPending, defaultUrl };
};
