import { InputSelect } from "@/components/forms";
import { useFormInput } from "@/hooks";
import { getAge } from "@/lib/get-age";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { UpdateCustomerFormSchema } from "../types";

type EditCustomerFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateCustomerFormSchema) => void;
};

export const EditCustomerFormInner = ({
  formId,
  onSubmit,
}: EditCustomerFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<UpdateCustomerFormSchema>();

  const { InputText, InputStringNumber, InputDate } =
    useFormInput<UpdateCustomerFormSchema>();

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
      <InputText name="fullName" label={t("models.customer.fields.fullName")} />
      <InputText
        name="nationalId"
        label={t("models.customer.fields.nationalId")}
      />
      <div className="flex items-center gap-x-5">
        <InputDate
          name="birthDate"
          label={t("models.customer.fields.birthDate")}
          className="max-w-3xs"
        />
        <InputText
          name="birthPlace"
          label={t("models.customer.fields.birthPlace")}
        />
      </div>
      <InputSelect<UpdateCustomerFormSchema, "gender">
        name="gender"
        label={t("models.customer.fields.gender")}
        options={[
          { label: t("enums.gender.male"), value: "MALE" },
          { label: t("enums.gender.female"), value: "FEMALE" },
        ]}
      />
      <InputStringNumber
        name="age"
        label={t("models.customer.fields.age")}
        readOnly
      />
      <InputText name="phone" label={t("models.customer.fields.phone")} />
      <InputText name="email" label={t("models.customer.fields.email")} />
      <InputText name="address" label={t("models.customer.fields.address")} />
      <InputSelect<UpdateCustomerFormSchema, "maritalStatus">
        name="maritalStatus"
        label={t("models.customer.fields.maritalStatus")}
        options={[
          { label: t("enums.maritalStatus.single"), value: "SINGLE" },
          { label: t("enums.maritalStatus.married"), value: "MARRIED" },
          { label: t("enums.maritalStatus.divorced"), value: "DIVORCED" },
          { label: t("enums.maritalStatus.widowed"), value: "WIDOWED" },
        ]}
      />
      <InputSelect<UpdateCustomerFormSchema, "employmentType">
        name="employmentType"
        label={t("models.customer.fields.employmentType")}
        options={[
          {
            label: t("enums.employmentType.civilServant"),
            value: "CIVIL_SERVANT",
          },
          {
            label: t("enums.employmentType.privateEmployee"),
            value: "PRIVATE_EMPLOYEE",
          },
          {
            label: t("enums.employmentType.stateOwnedEmployee"),
            value: "STATE_OWNED_EMPLOYEE",
          },
          {
            label: t("enums.employmentType.contractEmployee"),
            value: "CONTRACT_EMPLOYEE",
          },
          { label: t("enums.employmentType.freelancer"), value: "FREELANCER" },
          {
            label: t("enums.employmentType.entrepreneur"),
            value: "ENTREPRENEUR",
          },
          {
            label: t("enums.employmentType.businessOwner"),
            value: "BUSINESS_OWNER",
          },
          { label: t("enums.employmentType.farmer"), value: "FARMER" },
          { label: t("enums.employmentType.fisherman"), value: "FISHERMAN" },
          { label: t("enums.employmentType.laborer"), value: "LABORER" },
          { label: t("enums.employmentType.teacher"), value: "TEACHER" },
          { label: t("enums.employmentType.lecturer"), value: "LECTURER" },
          {
            label: t("enums.employmentType.healthWorker"),
            value: "HEALTH_WORKER",
          },
          { label: t("enums.employmentType.student"), value: "STUDENT" },
          { label: t("enums.employmentType.homemaker"), value: "HOMEMAKER" },
          { label: t("enums.employmentType.retired"), value: "RETIRED" },
          { label: t("enums.employmentType.unemployed"), value: "UNEMPLOYED" },
        ]}
      />
      <InputText
        name="employmentName"
        label={t("models.customer.fields.employmentName")}
      />
      <InputStringNumber
        name="employmentPeriod"
        label={t("models.customer.fields.employmentPeriod")}
      />
    </form>
  );
};
