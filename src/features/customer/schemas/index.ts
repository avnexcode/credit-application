import { capitalizeSentence, enumToObject } from "@/utils";
import { EmploymentType, Gender, MaritalStatus } from "@prisma";
import { t as translator, type TFunction } from "i18next";
import { z } from "zod";

const gender = enumToObject(Gender);
const maritalStatus = enumToObject(MaritalStatus);
const employmentType = enumToObject(EmploymentType);

export const baseCustomerFormSchema = (t: TFunction = translator) => {
  const fullNameField = t("models.customer.fields.fullName");
  const nationalIdField = t("models.customer.fields.nationalId");
  const birthPlaceField = t("models.customer.fields.birthPlace");
  const birthDateField = t("models.customer.fields.birthDate");
  const genderField = t("models.customer.fields.gender");
  const ageField = t("models.customer.fields.age");
  const phoneField = t("models.customer.fields.phone");
  const emailField = t("models.customer.fields.email");
  const addressField = t("models.customer.fields.address");
  const maritalStatusField = t("models.customer.fields.maritalStatus");
  const employmentTypeField = t("models.customer.fields.employmentType");
  const employmentNameField = t("models.customer.fields.employmentName");
  const employmentPeriodField = t("models.customer.fields.employmentPeriod");
  const userIdField = t("models.user.title");

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
      .trim()
      .nullable()
      .optional(),

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
      .trim()
      .nullable()
      .optional(),

    birthDate: z
      .date({
        message: capitalizeSentence(
          t("schemas.validation.date.invalid", { field: birthDateField }),
        ),
      })
      .nullable()
      .optional(),

    gender: z
      .enum(gender, {
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: genderField }),
        ),
      })
      .nullable()
      .optional(),

    age: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: ageField }),
        ),
      })
      .nullable()
      .optional(),

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
      .trim()
      .nullable()
      .optional(),

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
      .trim()
      .nullable()
      .optional(),

    maritalStatus: z
      .enum(maritalStatus, {
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", {
            field: maritalStatusField,
          }),
        ),
      })
      .nullable()
      .optional(),

    employmentType: z
      .enum(employmentType, {
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", {
            field: employmentTypeField,
          }),
        ),
      })
      .nullable()
      .optional(),

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

    userId: z
      .uuid(
        capitalizeSentence(
          t("schemas.validation.string.uuid", { field: userIdField }),
        ),
      )
      .max(
        56,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: userIdField,
            max: 56,
          }),
        ),
      )
      .nullable()
      .optional(),
  });
};

export const createCustomerFormSchema = (t: TFunction = translator) => {
  return baseCustomerFormSchema(t);
};

export const updateCustomerFormSchema = (t: TFunction = translator) => {
  return baseCustomerFormSchema(t);
};
