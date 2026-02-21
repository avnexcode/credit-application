import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { updateInterviewQuestionFormSchema } from "../schemas";
import type {
  InterviewQuestionResponse,
  UpdateInterviewQuestionFormSchema,
} from "../types";

type booleanSelect = "true" | "false";

export const useUpdateInterviewQuestion = (
  interviewQuestion: InterviewQuestionResponse,
): MutateFunctionReturn<UpdateInterviewQuestionFormSchema> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/interview-question`;
  const router = useRouter();
  const { t } = useTranslation();
  const [hasInterviewQuestionChanges, setHasInterviewQuestionChanges] =
    useState(false);
  const [initialData, setInitialData] =
    useState<UpdateInterviewQuestionFormSchema | null>(null);

  const form = useForm<UpdateInterviewQuestionFormSchema>({
    defaultValues: {
      questionText: interviewQuestion.questionText,
      questionType: interviewQuestion.questionType,
      category: interviewQuestion.category,
      isRequired: interviewQuestion.isRequired
        ? "true"
        : ("false" as booleanSelect),
      isActive: interviewQuestion.isActive
        ? "true"
        : ("false" as booleanSelect),
      orderNumber: String(interviewQuestion.orderNumber),
      options: interviewQuestion.options
        ? interviewQuestion.options.join(", ")
        : "",
      placeholder: interviewQuestion.placeholder,
    } satisfies DefaultValues<UpdateInterviewQuestionFormSchema>,
    resolver: zodResolver(updateInterviewQuestionFormSchema(t)),
  });

  useEffect(() => {
    const initInterviewQuestionValues = {
      questionText: interviewQuestion.questionText,
      questionType: interviewQuestion.questionType,
      category: interviewQuestion.category,
      isRequired: interviewQuestion.isRequired
        ? "true"
        : ("false" as booleanSelect),
      isActive: interviewQuestion.isActive
        ? "true"
        : ("false" as booleanSelect),
      orderNumber: String(interviewQuestion.orderNumber ?? ""),
      options: interviewQuestion.options
        ? interviewQuestion.options.join(", ")
        : "",
      placeholder: interviewQuestion.placeholder ?? "",
    };

    setInitialData(initInterviewQuestionValues);
    form.reset(initInterviewQuestionValues);
  }, [interviewQuestion, form]);

  const watchedValues = form.watch();

  useEffect(() => {
    if (initialData) {
      const hasChanges =
        JSON.stringify(watchedValues) !== JSON.stringify(initialData);
      setHasInterviewQuestionChanges(hasChanges);
    }
  }, [watchedValues, initialData]);

  const apiInterviewQuestionUtils = api.useUtils().interviewQuestion;

  const {
    mutate: updateInterviewQuestion,
    isPending: isUpdateInterviewQuestionPending,
  } = api.interviewQuestion.update.useMutation({
    onSuccess: () => {
      form.reset();
      void apiInterviewQuestionUtils.getAll.invalidate();
      void router.push(defaultUrl);
      toast.success(
        capitalizeSentence(
          t("successes.message.update", {
            field: t("models.interviewQuestion.title"),
          }),
        ),
      );
    },
    onError: (error) => {
      toast.success(
        error.message ||
          capitalizeSentence(
            t("errors.messages.update", {
              field: t("models.interviewQuestion.title"),
            }),
          ),
      );
    },
  });

  const onSubmit = (values: UpdateInterviewQuestionFormSchema) => {
    updateInterviewQuestion({
      id: interviewQuestion.id,
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
    hasChanges: hasInterviewQuestionChanges,
    isPending: isUpdateInterviewQuestionPending,
    defaultUrl,
  };
};
