import { capitalizeSentence } from "@/utils";
import { t as translator, type TFunction } from "i18next";
import z from "zod";

export const createEmailValidation = (t: TFunction = translator) => {
  const emailField = t("models.auth.fields.email");
  return z
    .email(capitalizeSentence(t("schemas.validation.string.email")))
    .min(
      1,
      capitalizeSentence(
        t("schemas.validation.common.required", { field: emailField }),
      ),
    )
    .max(
      150,
      capitalizeSentence(
        t("schemas.validation.string.max", { field: emailField, max: 150 }),
      ),
    )
    .trim()
    .toLowerCase();
};
