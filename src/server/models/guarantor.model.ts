import type { Guarantor, Prisma } from "@prisma";
import type z from "zod";
import type {
  createGuarantorRequest,
  deleteGuarantorRequest,
  deleteGuarantorsRequest,
  updateGuarantorRequest,
} from "../validations";

export type CreateGuarantorRequest = z.infer<typeof createGuarantorRequest>;

export type UpdateGuarantorRequest = z.infer<typeof updateGuarantorRequest>;

export type DeleteGuarantorRequest = z.infer<typeof deleteGuarantorRequest>;

export type DeleteGuarantorsRequest = z.infer<typeof deleteGuarantorsRequest>;

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

export type CreateGuarantorResponse = Omit<Guarantor, "updatedAt">;

export type UpdateGuarantorResponse = Omit<Guarantor, "createdAt">;

export type DeleteGuarantorResponse = Pick<Guarantor, "id">;

export type DeleteGuarantorsResponse = Pick<Guarantor, "id">[];
