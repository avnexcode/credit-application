import { env } from "@/configs/env";
import type { DeleteFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteManyAdmins = (): DeleteFunctionReturn<{
  ids: string[];
}> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/admin`;
  const router = useRouter();
  const { t } = useTranslation();

  const apiAdminUtils = api.useUtils().admin;

  const { mutate: deleteAdmins, isPending: isDeleteAdminsPending } =
    api.admin.deleteMany.useMutation({
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

  const onDelete = (values: { ids: string[] }) => {
    deleteAdmins({ request: { ids: values.ids } });
  };

  return { onDelete, isPending: isDeleteAdminsPending, defaultUrl };
};
