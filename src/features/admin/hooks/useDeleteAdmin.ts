import { env } from "@/configs/env";
import type { DeleteFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteAdmin = (): DeleteFunctionReturn<{ id: string }> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/admin`;
  const router = useRouter();
  const { t } = useTranslation();

  const apiAdminUtils = api.useUtils().admin;

  const { mutate: deleteAdmin, isPending: isDeleteAdminPending } =
    api.admin.delete.useMutation({
      onSuccess: () => {
        void apiAdminUtils.getAll.invalidate();
        void router.push(defaultUrl);
        toast.success(
          capitalizeSentence(
            t("successes.message.delete", {
              field: t("models.admin.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.delete", {
                field: t("models.admin.title"),
              }),
            ),
        );
      },
    });

  const onDelete = (values: { id: string }) => {
    deleteAdmin({ request: { id: values.id } });
  };

  return { onDelete, isPending: isDeleteAdminPending, defaultUrl };
};
