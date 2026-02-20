import type { DBClient } from "@/server/db";
import type {
  BankAccountResponse,
  CreateBankAccountRequest,
  CreateBankAccountResponse,
  DeleteBankAccountRequest,
  DeleteBankAccountResponse,
  DeleteBankAccountsRequest,
  DeleteBankAccountsResponse,
  QueryParams,
  UpdateBankAccountRequest,
  UpdateBankAccountResponse,
} from "@/server/models";

export class BankAccountRepository {
  protected static orQuery = ["accountName", "accountNumber"];

  static findMany = async (
    db: DBClient,
    params: QueryParams,
  ): Promise<BankAccountResponse[]> => {
    const { page, limit, search, sort } = params;

    const skip = (page - 1) * limit;

    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const bankAccounts = await db.bankAccount.findMany({
      where: { ...(search && { OR: orQuery }) },
      select: {
        id: true,
        accountName: true,
        accountNumber: true,
        isPrimary: true,
        isVerified: true,
        isActive: true,
        customerId: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip,
      orderBy: sort.map((s) => ({ [s.id]: s.desc ? "desc" : "asc" })),
    });

    return bankAccounts;
  };

  static findUniqueId = async (
    db: DBClient,
    bankAccountId: string,
  ): Promise<BankAccountResponse | null> => {
    const bankAccount = await db.bankAccount.findUnique({
      where: { id: bankAccountId },
      select: {
        id: true,
        accountName: true,
        accountNumber: true,
        isPrimary: true,
        isVerified: true,
        isActive: true,
        customerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return bankAccount;
  };

  static findUniqueAccountNumber = async (
    db: DBClient,
    accountNumber: string,
  ): Promise<BankAccountResponse | null> => {
    const bankAccount = await db.bankAccount.findUnique({
      where: { accountNumber },
      select: {
        id: true,
        accountName: true,
        accountNumber: true,
        isPrimary: true,
        isVerified: true,
        isActive: true,
        customerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return bankAccount;
  };

  static countAllSearch = async (
    db: DBClient,
    search?: string,
  ): Promise<number> => {
    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const bankAccountsCount = await db.bankAccount.count({
      where: { ...(search && { OR: orQuery }) },
    });

    return bankAccountsCount;
  };

  static countUniqueId = async (
    db: DBClient,
    bankAccountId: string,
  ): Promise<number> => {
    const bankAccountsCount = await db.bankAccount.count({
      where: { id: bankAccountId },
    });

    return bankAccountsCount;
  };

  static countUniqueAccountNumber = async (
    db: DBClient,
    accountNumber: string,
  ): Promise<number> => {
    const bankAccountsCount = await db.bankAccount.count({
      where: { accountNumber },
    });

    return bankAccountsCount;
  };

  static insert = async (
    db: DBClient,
    request: CreateBankAccountRequest,
  ): Promise<CreateBankAccountResponse> => {
    const bankAccount = await db.bankAccount.create({
      data: { ...request },
      select: {
        id: true,
        accountName: true,
        accountNumber: true,
        isPrimary: true,
        isVerified: true,
        isActive: true,
        customerId: true,
        createdAt: true,
      },
    });

    return bankAccount;
  };

  static update = async (
    db: DBClient,
    bankAccountId: string,
    request: UpdateBankAccountRequest,
  ): Promise<UpdateBankAccountResponse> => {
    const bankAccount = await db.bankAccount.update({
      where: { id: bankAccountId },
      data: { ...request },
      select: {
        id: true,
        accountName: true,
        accountNumber: true,
        isPrimary: true,
        isVerified: true,
        isActive: true,
        customerId: true,
        updatedAt: true,
      },
    });

    return bankAccount;
  };

  static destroy = async (
    db: DBClient,
    request: DeleteBankAccountRequest,
  ): Promise<DeleteBankAccountResponse> => {
    const bankAccount = await db.bankAccount.delete({
      where: { id: request.id },
      select: { id: true },
    });

    return bankAccount;
  };

  static destroyMany = async (
    db: DBClient,
    request: DeleteBankAccountsRequest,
  ): Promise<DeleteBankAccountsResponse> => {
    const bankAccounts = await db.bankAccount.findMany({
      where: { id: { in: request.ids } },
      select: { id: true },
    });

    await db.bankAccount.deleteMany({ where: { id: { in: request.ids } } });

    return bankAccounts;
  };
}
