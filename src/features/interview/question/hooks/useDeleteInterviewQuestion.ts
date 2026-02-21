import { env } from "@/configs/env";
import type { DeleteFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteInterviewQuestion = (): DeleteFunctionReturn<{
  id: string;
}> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/interview-question`;
  const router = useRouter();
  const { t } = useTranslation();

  const apiInterviewQuestionUtils = api.useUtils().interviewQuestion;

  const {
    mutate: deleteInterviewQuestion,
    isPending: isDeleteInterviewQuestionPending,
  } = api.interviewQuestion.delete.useMutation({
    onSuccess: () => {
      void apiInterviewQuestionUtils.getAll.invalidate();
      void router.push(defaultUrl);
      toast.success(
        capitalizeSentence(
          t("successes.message.delete", {
            field: t("models.interviewQuestion.title"),
          }),
        ),
      );
    },
    onError: (error) => {
      toast.success(
        error.message ||
          capitalizeSentence(
            t("errors.messages.delete", {
              field: t("models.interviewQuestion.title"),
            }),
          ),
      );
    },
  });

  const onDelete = (values: { id: string }) => {
    deleteInterviewQuestion({ request: { id: values.id } });
  };

  return { onDelete, isPending: isDeleteInterviewQuestionPending, defaultUrl };
};
