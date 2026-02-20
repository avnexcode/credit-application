import type { BankAccount, Prisma } from "@prisma";
import type z from "zod";
import type {
  createBankAccountRequest,
  deleteBankAccountRequest,
  deleteBankAccountsRequest,
  updateBankAccountRequest,
} from "../validations";

export type CreateBankAccountRequest = z.infer<typeof createBankAccountRequest>;

export type UpdateBankAccountRequest = z.infer<typeof updateBankAccountRequest>;

export type DeleteBankAccountRequest = z.infer<typeof deleteBankAccountRequest>;

export type DeleteBankAccountsRequest = z.infer<
  typeof deleteBankAccountsRequest
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

export type CreateBankAccountResponse = Omit<BankAccount, "updatedAt">;

export type UpdateBankAccountResponse = Omit<BankAccount, "createdAt">;

export type DeleteBankAccountResponse = Pick<BankAccount, "id">;

export type DeleteBankAccountsResponse = Pick<BankAccount, "id">[];
