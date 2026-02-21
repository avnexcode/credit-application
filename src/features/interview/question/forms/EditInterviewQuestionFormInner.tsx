import { InputSelect } from "@/components/forms";
import { useFormInput } from "@/hooks";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { UpdateInterviewQuestionFormSchema } from "../types";

type EditInterviewQuestionFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateInterviewQuestionFormSchema) => void;
};

export const EditInterviewQuestionFormInner = ({
  formId,
  onSubmit,
}: EditInterviewQuestionFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<UpdateInterviewQuestionFormSchema>();
  const { InputText, InputStringNumber } =
    useFormInput<UpdateInterviewQuestionFormSchema>();

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <InputText
        name="questionText"
        label={t("models.interviewQuestion.fields.questionText")}
      />
      <InputSelect<UpdateInterviewQuestionFormSchema, "questionType">
        name="questionType"
        label={t("models.interviewQuestion.fields.questionType")}
        options={[
          {
            label: t("enums.questionType.singleChoice"),
            value: "SINGLE_CHOICE",
          },
          {
            label: t("enums.questionType.multipleChoice"),
            value: "MULTIPLE_CHOICE",
          },
          { label: t("enums.questionType.yesNo"), value: "YES_NO" },
          { label: t("enums.questionType.trueFalse"), value: "TRUE_FALSE" },
          { label: t("enums.questionType.rating"), value: "RATING" },
          { label: t("enums.questionType.scale"), value: "SCALE" },
          { label: t("enums.questionType.percentage"), value: "PERCENTAGE" },
        ]}
      />
      <InputSelect<UpdateInterviewQuestionFormSchema, "isRequired">
        name="isRequired"
        label={t("models.interviewQuestion.fields.isRequired")}
        options={[
          { label: "YA", value: "true" },
          { label: "TIDAK", value: "false" },
        ]}
      />
      <InputSelect<UpdateInterviewQuestionFormSchema, "isActive">
        name="isActive"
        label={t("models.interviewQuestion.fields.isActive")}
        options={[
          { label: "YA", value: "true" },
          { label: "TIDAK", value: "false" },
        ]}
      />
      <InputText
        name="options"
        label={t("models.interviewQuestion.fields.options")}
      />
      <InputSelect<UpdateInterviewQuestionFormSchema, "category">
        name="category"
        label={t("models.interviewQuestion.fields.category")}
        options={[
          { label: t("enums.questionCategory.personal"), value: "PERSONAL" },
          { label: t("enums.questionCategory.identity"), value: "IDENTITY" },
          { label: t("enums.questionCategory.contact"), value: "CONTACT" },
          { label: t("enums.questionCategory.address"), value: "ADDRESS" },
          {
            label: t("enums.questionCategory.employment"),
            value: "EMPLOYMENT",
          },
          { label: t("enums.questionCategory.income"), value: "INCOME" },
          { label: t("enums.questionCategory.expense"), value: "EXPENSE" },
          { label: t("enums.questionCategory.financial"), value: "FINANCIAL" },
          { label: t("enums.questionCategory.business"), value: "BUSINESS" },
          {
            label: t("enums.questionCategory.collateral"),
            value: "COLLATERAL",
          },
          { label: t("enums.questionCategory.reference"), value: "REFERENCE" },
          { label: t("enums.questionCategory.emergency"), value: "EMERGENCY" },
          { label: t("enums.questionCategory.education"), value: "EDUCATION" },
          { label: t("enums.questionCategory.family"), value: "FAMILY" },
          {
            label: t("enums.questionCategory.loanPurpose"),
            value: "LOAN_PURPOSE",
          },
          {
            label: t("enums.questionCategory.creditHistory"),
            value: "CREDIT_HISTORY",
          },
          { label: t("enums.questionCategory.assets"), value: "ASSETS" },
          {
            label: t("enums.questionCategory.liabilities"),
            value: "LIABILITIES",
          },
          {
            label: t("enums.questionCategory.bankAccount"),
            value: "BANK_ACCOUNT",
          },
          { label: t("enums.questionCategory.other"), value: "OTHER" },
        ]}
      />
      <InputText
        name="placeholder"
        label={t("models.interviewQuestion.fields.placeholder")}
      />
      <InputStringNumber
        name="orderNumber"
        label={t("models.interviewQuestion.fields.orderNumber")}
        readOnly
      />
    </form>
  );
};
