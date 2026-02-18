import type { Customer, Prisma } from "@prisma";
import type z from "zod";
import type {
  createCustomerRequest,
  deleteCustomerRequest,
  deleteCustomersRequest,
  updateCustomerRequest,
} from "../validations";

export type CreateCustomerRequest = z.infer<typeof createCustomerRequest>;

export type UpdateCustomerRequest = z.infer<typeof updateCustomerRequest>;

export type DeleteCustomerRequest = z.infer<typeof deleteCustomerRequest>;

export type DeleteCustomersRequest = z.infer<typeof deleteCustomersRequest>;

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

export type CreateCustomerResponse = Omit<Customer, "updatedAt">;

export type UpdateCustomerResponse = Omit<Customer, "createdAt">;

export type DeleteCustomerResponse = Pick<Customer, "id">;

export type DeleteCustomersResponse = Pick<Customer, "id">[];
