import { enumToObject } from "@/utils";
import z from "zod";
import { LoginProvider, UserRole } from "../../../generated/prisma";
import { emailValidation } from "./auth.validation";

export const loginProviders = enumToObject(LoginProvider);

export const role = enumToObject(UserRole);

export const createUserRequest = z.object({
  email: emailValidation,
  avatarUrl: z.string().url().optional(),
  provider: z.enum(loginProviders).default("EMAIL"),
  role: z.enum(role).default("ADMIN"),
});

export const updateUserRequest = z.object({
  username: z.string().min(1).max(50).optional(),
  email: emailValidation.optional(),
  phone: z
    .string()
    .min(1)
    .min(8)
    .max(15)
    .regex(/^[0-9+\-() ]+$/)
    .or(z.literal(""))
    .optional()
    .nullable(),
  avatar: z.url().optional().nullable(),
  image: z.url().optional().nullable(),
  provider: z.enum(loginProviders).optional(),
});
