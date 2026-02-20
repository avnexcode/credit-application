import type { Prisma } from "@prisma";
import type z from "zod";
import type {
  createBankAccountFormSchema,
  updateBankAccountFormSchema,
} from "../schemas";

export type CreateBankAccountFormSchema = z.infer<
  ReturnType<typeof createBankAccountFormSchema>
>;

export type UpdateBankAccountFormSchema = z.infer<
  ReturnType<typeof updateBankAccountFormSchema>
>;

export type BankAccountResponse = Prisma.BankAccountGetPayload<{
  select: {
    id: true;
    accountName: true;
    accountNumber: true;
    isPrimary: true;
    isVerified: true;
    isActive: true;
    customerId: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
