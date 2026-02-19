import { capitalizeSentence, enumToObject } from "@/utils";
import { Gender, MaritalStatus } from "@prisma";
import { t as translator, type TFunction } from "i18next";
import { z } from "zod";

const gender = enumToObject(Gender);
const maritalStatus = enumToObject(MaritalStatus);

export const baseAdminFormSchema = (t: TFunction = translator) => {
  const fullNameField = t("models.admin.fields.fullName");
  const nationalIdField = t("models.admin.fields.nationalId");
  const birthPlaceField = t("models.admin.fields.birthPlace");
  const birthDateField = t("models.admin.fields.birthDate");
  const genderField = t("models.admin.fields.gender");
  const ageField = t("models.admin.fields.age");
  const phoneField = t("models.admin.fields.phone");
  const emailField = t("models.admin.fields.email");
  const addressField = t("models.admin.fields.address");
  const maritalStatusField = t("models.admin.fields.maritalStatus");
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

export const createAdminFormSchema = (t: TFunction = translator) => {
  return baseAdminFormSchema(t);
};

export const updateAdminFormSchema = (t: TFunction = translator) => {
  return baseAdminFormSchema(t);
};
