import type { Prisma } from "@prisma";
import type z from "zod";
import type {
  createGuarantorFormSchema,
  updateGuarantorFormSchema,
} from "../schemas";

export type CreateGuarantorFormSchema = z.infer<
  ReturnType<typeof createGuarantorFormSchema>
>;

export type UpdateGuarantorFormSchema = z.infer<
  ReturnType<typeof updateGuarantorFormSchema>
>;

export type GuarantorResponse = Prisma.GuarantorGetPayload<{
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
    employmentType: true;
    employmentName: true;
    employmentPeriod: true;
    relationship: true;
    customerId: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
