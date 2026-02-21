import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createInterviewQuestionFormSchema } from "../schemas";
import type { CreateInterviewQuestionFormSchema } from "../types";

export const useCreateInterviewQuestion =
  (): MutateFunctionReturn<CreateInterviewQuestionFormSchema> => {
    const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/interview-question`;
    const router = useRouter();
    const { t } = useTranslation();

    const form = useForm<CreateInterviewQuestionFormSchema>({
      defaultValues: {
        questionText: "",
        questionType: "SCALE",
        category: "OTHER",
        isRequired: "false",
        isActive: "false",
        orderNumber: "",
        options: "",
        placeholder: "",
      } satisfies DefaultValues<CreateInterviewQuestionFormSchema>,
      resolver: zodResolver(createInterviewQuestionFormSchema(t)),
    });

    const apiInterviewQuestionUtils = api.useUtils().interviewQuestion;

    const {
      mutate: createInterviewQuestion,
      isPending: isCreateInterviewQuestionPending,
    } = api.interviewQuestion.create.useMutation({
      onSuccess: () => {
        form.reset();
        void apiInterviewQuestionUtils.getAll.invalidate();
        void router.push(defaultUrl);
        toast.success(
          capitalizeSentence(
            t("successes.message.create", {
              field: t("models.interviewQuestion.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.create", {
                field: t("models.interviewQuestion.title"),
              }),
            ),
        );
      },
    });

    const onSubmit = (values: CreateInterviewQuestionFormSchema) => {
      createInterviewQuestion({
        request: {
          ...values,
          orderNumber: Number(values.orderNumber),
          isRequired: values.isRequired === "true",
          isActive: values.isActive === "true",
          options: values.options
            ? values.options
                .split(",")
                .map((opt) => opt.trim())
                .filter(Boolean)
            : [],
        },
      });
    };

    return {
      form,
      onSubmit,
      isPending: isCreateInterviewQuestionPending,
      defaultUrl,
    };
  };
