import z from "zod";

export const createBankAccountRequest = z.object({
  accountName: z.string().min(1).max(150).trim().toLowerCase(),
  accountNumber: z.string().min(1).max(100).trim(),
  isPrimary: z.boolean().default(false).optional(),
  isVerified: z.boolean().default(false).optional(),
  isActive: z.boolean().default(true).optional(),
  customerId: z.uuid(),
});

export const updateBankAccountRequest = createBankAccountRequest.partial();

export const deleteBankAccountRequest = z.object({
  id: z.uuid().min(1),
});

export const deleteBankAccountsRequest = z.object({
  ids: z.array(z.string()).min(1),
});
