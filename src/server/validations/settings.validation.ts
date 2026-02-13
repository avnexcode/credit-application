import { enumToObject } from "@/utils";
import z from "zod";
import { Language, Theme } from "../../../generated/prisma";

export const themes = enumToObject(Theme);
export const languages = enumToObject(Language);

export const createSettingsRequest = z.object({
  theme: z.enum(themes).default("SYSTEM"),
  language: z.enum(languages).default("ID"),
  notification: z.boolean().default(true),
});

export const updateSettingsRequest = createSettingsRequest.partial();

export const deleteSettingsRequest = z.object({
  id: z.uuid().min(1),
});
