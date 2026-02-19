import { InputSelect } from "@/components/forms";
import { useFormInput } from "@/hooks";
import { getAge } from "@/lib/get-age";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { UpdateAdminFormSchema } from "../types";

type EditAdminFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateAdminFormSchema) => void;
};

export const EditAdminFormInner = ({
  formId,
  onSubmit,
}: EditAdminFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<UpdateAdminFormSchema>();
  const { InputText, InputStringNumber, InputDate } =
    useFormInput<UpdateAdminFormSchema>();

  const birthDate = form.watch("birthDate");

  useEffect(() => {
    if (!birthDate) return;
    form.setValue("age", String(getAge(birthDate)), { shouldValidate: true });
  }, [birthDate]);

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <InputText name="fullName" label={t("models.admin.fields.fullName")} />
      <InputText
        name="nationalId"
        label={t("models.admin.fields.nationalId")}
      />
      <div className="flex items-center gap-x-5">
        <InputDate
          name="birthDate"
          label={t("models.admin.fields.birthDate")}
          className="max-w-3xs"
        />
        <InputText
          name="birthPlace"
          label={t("models.admin.fields.birthPlace")}
        />
      </div>
      <InputSelect<UpdateAdminFormSchema, "gender">
        name="gender"
        label={t("models.admin.fields.gender")}
        options={[
          { label: t("enums.gender.male"), value: "MALE" },
          { label: t("enums.gender.female"), value: "FEMALE" },
        ]}
      />
      <InputStringNumber
        name="age"
        label={t("models.admin.fields.age")}
        readOnly
      />
      <InputText name="phone" label={t("models.admin.fields.phone")} />
      <InputText name="email" label={t("models.admin.fields.email")} />
      <InputText name="address" label={t("models.admin.fields.address")} />
      <InputSelect<UpdateAdminFormSchema, "maritalStatus">
        name="maritalStatus"
        label={t("models.admin.fields.maritalStatus")}
        options={[
          { label: t("enums.maritalStatus.single"), value: "SINGLE" },
          { label: t("enums.maritalStatus.married"), value: "MARRIED" },
          { label: t("enums.maritalStatus.divorced"), value: "DIVORCED" },
          { label: t("enums.maritalStatus.widowed"), value: "WIDOWED" },
        ]}
      />
    </form>
  );
};
