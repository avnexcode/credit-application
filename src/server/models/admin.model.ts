import type { Admin, Prisma } from "@prisma";
import type z from "zod";
import type {
  createAdminRequest,
  deleteAdminRequest,
  deleteAdminsRequest,
  updateAdminRequest,
} from "../validations";

export type CreateAdminRequest = z.infer<typeof createAdminRequest>;

export type UpdateAdminRequest = z.infer<typeof updateAdminRequest>;

export type DeleteAdminRequest = z.infer<typeof deleteAdminRequest>;

export type DeleteAdminsRequest = z.infer<typeof deleteAdminsRequest>;

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

export type CreateAdminResponse = Omit<Admin, "updatedAt">;

export type UpdateAdminResponse = Omit<Admin, "createdAt">;

export type DeleteAdminResponse = Pick<Admin, "id">;

export type DeleteAdminsResponse = Pick<Admin, "id">[];
