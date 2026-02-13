import type z from "zod";
import type {
  createLoginFormSchema,
  createEmployeeLoginFormSchema,
  createRegisterFormSchema,
} from "../schemas";

export type RegisterFormSchema = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>;

export type LoginFormSchema = z.infer<ReturnType<typeof createLoginFormSchema>>;

export type EmployeeLoginFormSchema = z.infer<
  ReturnType<typeof createEmployeeLoginFormSchema>
>;
