import { InputSelect } from "@/components/forms";
import { SelectCustomerForm } from "@/features/customer/forms";
import { useFormInput } from "@/hooks";
import { getAge } from "@/lib/get-age";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { UpdateGuarantorFormSchema } from "../types";

type EditGuarantorFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateGuarantorFormSchema) => void;
};

export const EditGuarantorFormInner = ({
  formId,
  onSubmit,
}: EditGuarantorFormInnerProps) => {
  const { t } = useTranslation();
  const form = useFormContext<UpdateGuarantorFormSchema>();

  const { InputText, InputStringNumber, InputDate } =
    useFormInput<UpdateGuarantorFormSchema>();

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
      <InputText
        name="fullName"
        label={t("models.guarantor.fields.fullName")}
        required
      />
      <InputText
        name="nationalId"
        label={t("models.guarantor.fields.nationalId")}
        required
      />
      <div className="flex items-center gap-x-5">
        <InputDate
          name="birthDate"
          label={t("models.guarantor.fields.birthDate")}
          className="max-w-3xs"
          required
        />
        <InputText
          name="birthPlace"
          label={t("models.guarantor.fields.birthPlace")}
          required
        />
      </div>
      <InputSelect<UpdateGuarantorFormSchema, "gender">
        name="gender"
        label={t("models.guarantor.fields.gender")}
        required
        options={[
          { label: t("enums.gender.male"), value: "MALE" },
          { label: t("enums.gender.female"), value: "FEMALE" },
        ]}
      />
      <InputStringNumber
        name="age"
        label={t("models.guarantor.fields.age")}
        readOnly
        required
      />
      <SelectCustomerForm<UpdateGuarantorFormSchema>
        name="customerId"
        label={t("models.customer.title")}
        required
      />
      <InputSelect<UpdateGuarantorFormSchema, "relationship">
        name="relationship"
        label={t("models.guarantor.fields.relationship")}
        required
        options={[
          { label: t("enums.relationship.father"), value: "FATHER" },
          { label: t("enums.relationship.mother"), value: "MOTHER" },
          { label: t("enums.relationship.husband"), value: "HUSBAND" },
          { label: t("enums.relationship.wife"), value: "WIFE" },
          { label: t("enums.relationship.child"), value: "CHILD" },
          { label: t("enums.relationship.sibling"), value: "SIBLING" },
          { label: t("enums.relationship.grandfather"), value: "GRANDFATHER" },
          { label: t("enums.relationship.grandmother"), value: "GRANDMOTHER" },
          { label: t("enums.relationship.uncle"), value: "UNCLE" },
          { label: t("enums.relationship.aunt"), value: "AUNT" },
          { label: t("enums.relationship.cousin"), value: "COUSIN" },
          { label: t("enums.relationship.guardian"), value: "GUARDIAN" },
          { label: t("enums.relationship.other"), value: "OTHER" },
        ]}
      />
      <InputText
        name="phone"
        label={t("models.guarantor.fields.phone")}
        required
      />
      <InputText name="email" label={t("models.guarantor.fields.email")} />
      <InputText
        name="address"
        label={t("models.guarantor.fields.address")}
        required
      />
      <InputSelect<UpdateGuarantorFormSchema, "maritalStatus">
        name="maritalStatus"
        label={t("models.guarantor.fields.maritalStatus")}
        required
        options={[
          { label: t("enums.maritalStatus.single"), value: "SINGLE" },
          { label: t("enums.maritalStatus.married"), value: "MARRIED" },
          { label: t("enums.maritalStatus.divorced"), value: "DIVORCED" },
          { label: t("enums.maritalStatus.widowed"), value: "WIDOWED" },
        ]}
      />
      <InputSelect<UpdateGuarantorFormSchema, "employmentType">
        name="employmentType"
        label={t("models.guarantor.fields.employmentType")}
        required
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
        label={t("models.guarantor.fields.employmentName")}
      />
      <InputStringNumber
        name="employmentPeriod"
        label={t("models.guarantor.fields.employmentPeriod")}
      />
    </form>
  );
};
