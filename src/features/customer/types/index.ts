import type { Prisma } from "@prisma";
import type z from "zod";
import type {
  createCustomerFormSchema,
  updateCustomerFormSchema,
} from "../schemas";

export type CreateCustomerFormSchema = z.infer<
  ReturnType<typeof createCustomerFormSchema>
>;

export type UpdateCustomerFormSchema = z.infer<
  ReturnType<typeof updateCustomerFormSchema>
>;

export type CustomerResponse = Prisma.CustomerGetPayload<{
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
    createdAt: true;
    updatedAt: true;
  };
}>;
