import { enumToObject } from "@/utils";
import { EmploymentType, Gender, MaritalStatus, Relationship } from "@prisma";
import z from "zod";

const gender = enumToObject(Gender);
const maritalStatus = enumToObject(MaritalStatus);
const employmentType = enumToObject(EmploymentType);
const relationship = enumToObject(Relationship);

export const createGuarantorRequest = z.object({
  fullName: z.string().min(1).max(150).trim().toLowerCase(),
  nationalId: z.string().max(20).trim().toLowerCase(),
  birthPlace: z.string().max(100).trim(),
  birthDate: z.coerce.date(),
  gender: z.enum(gender),
  age: z.number().int(),
  phone: z.string().max(20).trim(),
  email: z.email().max(150).nullable().optional(),
  address: z.string().trim().toLowerCase(),
  maritalStatus: z.enum(maritalStatus),
  employmentType: z.enum(employmentType),
  employmentName: z
    .string()
    .max(150)
    .trim()
    .toLowerCase()
    .nullable()
    .optional(),
  employmentPeriod: z.number().int().min(0).nullable().optional(),
  customerId: z.uuid(),
  relationship: z.enum(relationship),
});

export const updateGuarantorRequest = createGuarantorRequest.partial();

export const deleteGuarantorRequest = z.object({
  id: z.uuid().min(1),
});

export const deleteGuarantorsRequest = z.object({
  ids: z.array(z.string()).min(1),
});
