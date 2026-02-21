import { capitalizeSentence, enumToObject } from "@/utils";
import { QuestionCategory, QuestionType } from "@prisma";
import { t as translator, type TFunction } from "i18next";
import { z } from "zod";

const questionType = enumToObject(QuestionType);
const questionCategory = enumToObject(QuestionCategory);

export const baseInterviewQuestionFormSchema = (t: TFunction = translator) => {
  const questionTextField = t("models.interviewQuestion.fields.questionText");
  const questionTypeField = t("models.interviewQuestion.fields.questionType");
  const categoryField = t("models.interviewQuestion.fields.category");
  const isRequiredField = t("models.interviewQuestion.fields.isRequired");
  const isActiveField = t("models.interviewQuestion.fields.isActive");
  const orderNumberField = t("models.interviewQuestion.fields.orderNumber");
  const optionsField = t("models.interviewQuestion.fields.options");
  const placeholderField = t("models.interviewQuestion.fields.placeholder");

  return z.object({
    questionText: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: questionTextField }),
        ),
      })
      .min(
        1,
        capitalizeSentence(
          t("schemas.validation.common.required", { field: questionTextField }),
        ),
      )
      .max(
        500,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: questionTextField,
            max: 500,
          }),
        ),
      )
      .trim(),

    questionType: z.enum(questionType, {
      message: capitalizeSentence(
        t("schemas.validation.common.invalid", { field: questionTypeField }),
      ),
    }),

    category: z
      .enum(questionCategory, {
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: categoryField }),
        ),
      })
      .nullable()
      .optional(),

    isRequired: z.enum(["true", "false"], {
      message: capitalizeSentence(
        t("schemas.validation.common.invalid", { field: isRequiredField }),
      ),
    }),

    isActive: z.enum(["true", "false"], {
      message: capitalizeSentence(
        t("schemas.validation.common.invalid", { field: isActiveField }),
      ),
    }),

    orderNumber: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: orderNumberField }),
        ),
      })
      .max(
        20,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: orderNumberField,
            max: 20,
          }),
        ),
      )
      .trim()
      .nullable()
      .optional(),

    options: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: optionsField }),
        ),
      })
      .trim()
      .nullable()
      .optional(),

    placeholder: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: placeholderField }),
        ),
      })
      .max(
        255,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: placeholderField,
            max: 255,
          }),
        ),
      )
      .trim()
      .nullable()
      .optional(),
  });
};

export const createInterviewQuestionFormSchema = (
  t: TFunction = translator,
) => {
  return baseInterviewQuestionFormSchema(t);
};

export const updateInterviewQuestionFormSchema = (
  t: TFunction = translator,
) => {
  return baseInterviewQuestionFormSchema(t);
};
