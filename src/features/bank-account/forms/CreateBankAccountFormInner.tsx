import { SelectCustomerForm } from "@/features/customer/forms";
import { useFormInput } from "@/hooks";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { CreateBankAccountFormSchema } from "../types";

type CreateBankAccountFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateBankAccountFormSchema) => void;
};

export const CreateBankAccountFormInner = ({
  formId,
  onSubmit,
}: CreateBankAccountFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<CreateBankAccountFormSchema>();
  const { InputText, InputStringNumber } =
    useFormInput<CreateBankAccountFormSchema>();

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <SelectCustomerForm<CreateBankAccountFormSchema>
        name="customerId"
        label={t("models.customer.title")}
        required
      />
      <InputText
        name="accountName"
        label={t("models.bankAccount.fields.accountName")}
        required
      />
      <InputStringNumber
        name="accountNumber"
        label={t("models.bankAccount.fields.accountNumber")}
        required
      />
    </form>
  );
};
