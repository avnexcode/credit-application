import { enumToObject } from "@/utils";
import { EmploymentType, Gender, MaritalStatus } from "@prisma";
import z from "zod";

const gender = enumToObject(Gender);
const maritalStatus = enumToObject(MaritalStatus);
const employmentType = enumToObject(EmploymentType);

export const createCustomerRequest = z.object({
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
  employmentType: z.enum(employmentType).nullable().optional(),
  employmentName: z
    .string()
    .max(150)
    .trim()
    .toLowerCase()
    .nullable()
    .optional(),
  employmentPeriod: z.number().int().min(0).nullable().optional(),
  userId: z.uuid().nullable().optional(),
});

export const updateCustomerRequest = createCustomerRequest.partial();

export const deleteCustomerRequest = z.object({
  id: z.uuid().min(1),
});

export const deleteCustomersRequest = z.object({
  ids: z.array(z.string()).min(1),
});
