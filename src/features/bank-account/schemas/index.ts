import { capitalizeSentence } from "@/utils";
import { t as translator, type TFunction } from "i18next";
import { z } from "zod";

export const baseBankAccountFormSchema = (t: TFunction = translator) => {
  const accountNameField = t("models.bankAccount.fields.accountName");
  const accountNumberField = t("models.bankAccount.fields.accountNumber");
  const isPrimaryField = t("models.bankAccount.fields.isPrimary");
  const isVerifiedField = t("models.bankAccount.fields.isVerified");
  const isActiveField = t("models.bankAccount.fields.isActive");
  const customerIdField = t("models.customer.title");

  return z.object({
    accountName: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: accountNameField }),
        ),
      })
      .min(
        1,
        capitalizeSentence(
          t("schemas.validation.common.required", { field: accountNameField }),
        ),
      )
      .max(
        150,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: accountNameField,
            max: 150,
          }),
        ),
      )
      .trim()
      .toLowerCase(),

    accountNumber: z
      .string({
        message: capitalizeSentence(
          t("schemas.validation.common.invalid", { field: accountNumberField }),
        ),
      })
      .min(
        1,
        capitalizeSentence(
          t("schemas.validation.common.required", {
            field: accountNumberField,
          }),
        ),
      )
      .max(
        100,
        capitalizeSentence(
          t("schemas.validation.string.max", {
            field: accountNumberField,
            max: 150,
          }),
        ),
      ),

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

export const createBankAccountFormSchema = (t: TFunction = translator) => {
  return baseBankAccountFormSchema(t);
};

export const updateBankAccountFormSchema = (t: TFunction = translator) => {
  return baseBankAccountFormSchema(t);
};
