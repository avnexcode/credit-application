import type { Prisma } from "@prisma";
import type z from "zod";
import type { createAdminFormSchema, updateAdminFormSchema } from "../schemas";

export type CreateAdminFormSchema = z.infer<
  ReturnType<typeof createAdminFormSchema>
>;

export type UpdateAdminFormSchema = z.infer<
  ReturnType<typeof updateAdminFormSchema>
>;

export type AdminResponse = Prisma.AdminGetPayload<{
  select: {
    id: true;
    fullName: true;
    nationalId: true;
    birthPlace: true;
    birthDate: true;
    gender: true;
    age: true;
    phone: true;
    email: true;
    address: true;
    maritalStatus: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
