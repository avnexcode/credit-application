import { enumToObject } from "@/utils";
import { Gender, MaritalStatus } from "@prisma";
import z from "zod";

const gender = enumToObject(Gender);
const maritalStatus = enumToObject(MaritalStatus);

export const createAdminRequest = z.object({
  fullName: z.string().min(1).max(150).trim().toLowerCase(),
  nationalId: z.string().max(20).trim().toLowerCase().nullable().optional(),
  birthPlace: z.string().max(100).trim().nullable().optional(),
  birthDate: z.coerce.date().nullable().optional(),
  gender: z.enum(gender).nullable().optional(),
  age: z.number().int().nullable().optional(),
  phone: z.string().max(20).trim().nullable().optional(),
  email: z.email().max(150).nullable().optional(),
  address: z.string().trim().toLowerCase().nullable().optional(),
  maritalStatus: z.enum(maritalStatus).nullable().optional(),
  userId: z.uuid().nullable().optional(),
});

export const updateAdminRequest = createAdminRequest.partial();

export const deleteAdminRequest = z.object({
  id: z.uuid().min(1),
});

export const deleteAdminsRequest = z.object({
  ids: z.array(z.string()).min(1),
});
