import { SelectCustomerForm } from "@/features/customer/forms";
import { useFormInput } from "@/hooks";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { UpdateBankAccountFormSchema } from "../types";

type EditBankAccountFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateBankAccountFormSchema) => void;
};

export const EditBankAccountFormInner = ({
  formId,
  onSubmit,
}: EditBankAccountFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<UpdateBankAccountFormSchema>();
  const { InputText, InputStringNumber } =
    useFormInput<UpdateBankAccountFormSchema>();

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <SelectCustomerForm<UpdateBankAccountFormSchema>
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
