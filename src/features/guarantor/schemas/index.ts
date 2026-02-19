import { capitalizeSentence, enumToObject } from "@/utils";
import { EmploymentType, Gender, MaritalStatus, Relationship } from "@prisma";
import { t as translator, type TFunction } from "i18next";
import { z } from "zod";

const gender = enumToObject(Gender);
const maritalStatus = enumToObject(MaritalStatus);
const employmentType = enumToObject(EmploymentType);
const relationship = enumToObject(Relationship);

export const baseGuarantorFormSchema = (t: TFunction = translator) => {
  const fullNameField = t("models.guarantor.fields.fullName");
  const nationalIdField = t("models.guarantor.fields.nationalId");
  const birthPlaceField = t("models.guarantor.fields.birthPlace");
  const birthDateField = t("models.guarantor.fields.birthDate");
  const genderField = t("models.guarantor.fields.gender");
  const ageField = t("models.guarantor.fields.age");
  const phoneField = t("models.guarantor.fields.phone");
  const emailField = t("models.guarantor.fields.email");
  const addressField = t("models.guarantor.fields.address");
  const maritalStatusField = t("models.guarantor.fields.maritalStatus");
  const employmentTypeField = t("models.guarantor.fields.employmentType");
  const employmentNameField = t("models.guarantor.fields.employmentName");
  const employmentPeriodField = t("models.guarantor.fields.employmentPeriod");
  const relationshipField = t("models.guarantor.fields.relationship");
  const customerIdField = t("models.customer.title");

  return z.object({
    fullName: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: fullNameField }),
        ),
      })
      .min(
        1,
        capitalizeSentence(
          t("schemas.validation.common.required", { field: fullNameField }),
        ),
      )
      .max(
        150,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: fullNameField,
            max: 150,
          }),
        ),
      )
      .trim()
      .toLowerCase(),

    nationalId: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: nationalIdField }),
        ),
      })
      .max(
        20,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: nationalIdField,
            max: 20,
          }),
        ),
      )
      .trim(),

    birthPlace: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: birthPlaceField }),
        ),
      })
      .max(
        100,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: birthPlaceField,
            max: 100,
          }),
        ),
      )
      .trim(),

    birthDate: z.date({
      message: capitalizeSentence(
        t("schemas.validation.date.invalid", { field: birthDateField }),
      ),
    }),

    gender: z.enum(gender, {
      message: capitalizeSentence(
        t("schemas.validation.common.invalid", { field: genderField }),
      ),
    }),

    age: z.string({
      message: capitalizeSentence(
        t("schemas.validation.common.invalid", { field: ageField }),
      ),
    }),

    phone: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: phoneField }),
        ),
      })
      .max(
        20,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: phoneField,
            max: 20,
          }),
        ),
      )
      .trim(),

    email: z
      .union([
        z
          .email(
            capitalizeSentence(
              t("schemas.validation.string.email", { field: emailField }),
            ),
          )
          .max(
            150,
            capitalizeSentence(
              t("schemas.validation.string.max", {
                field: emailField,
                max: 150,
              }),
            ),
          ),
        z.literal(""),
      ])
      .nullable()
      .optional(),

    address: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: addressField }),
        ),
      })
      .trim(),

    maritalStatus: z.enum(maritalStatus, {
      message: capitalizeSentence(
        t("schemas.validation.common.invalid", {
          field: maritalStatusField,
        }),
      ),
    }),

    employmentType: z.enum(employmentType, {
      message: capitalizeSentence(
        t("schemas.validation.common.invalid", {
          field: employmentTypeField,
        }),
      ),
    }),

    employmentName: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", {
            field: employmentNameField,
          }),
        ),
      })
      .max(
        150,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: employmentNameField,
            max: 150,
          }),
        ),
      )
      .trim()
      .nullable()
      .optional(),

    employmentPeriod: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", {
            field: employmentPeriodField,
          }),
        ),
      })
      .nullable()
      .optional(),

    relationship: z.enum(relationship, {
      message: capitalizeSentence(
        t("schemas.validation.common.invalid", {
          field: relationshipField,
        }),
      ),
    }),

    customerId: z
      .uuid(
        capitalizeSentence(
          t("schemas.validation.string.uuid", { field: customerIdField }),
        ),
      )
      .max(
        56,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: customerIdField,
            max: 56,
          }),
        ),
      ),
  });
};

export const createGuarantorFormSchema = (t: TFunction = translator) => {
  return baseGuarantorFormSchema(t);
};

export const updateGuarantorFormSchema = (t: TFunction = translator) => {
  return baseGuarantorFormSchema(t);
};
