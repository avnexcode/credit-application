import serverI18n from "@/lib/i18n/server";
import type { DBClient } from "@/server/db";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateBankAccountRequest,
  CreateBankAccountResponse,
  BankAccountResponse,
  DeleteBankAccountRequest,
  DeleteBankAccountResponse,
  DeleteBankAccountsRequest,
  DeleteBankAccountsResponse,
  QueryParams,
  UpdateBankAccountRequest,
  UpdateBankAccountResponse,
} from "@/server/models";
import { BaseService } from "../common";
import { BankAccountRepository } from "./bank-account.repository";

export class BankAccountService extends BaseService {
  protected static baseModel = serverI18n.t("models.bankAccount.title");

  protected static checkBankAccountExists = async (
    db: DBClient,
    bankAccountId: string,
  ): Promise<void> => {
    const isBankAccountExists = await BankAccountRepository.countUniqueId(
      db,
      bankAccountId,
    );

    await this.checkExists(isBankAccountExists === 0, this.baseModel);
  };

  static getAll = async (
    db: DBClient,
    params: QueryParams,
  ): Promise<QueryResponse<BankAccountResponse>> => {
    const { page, limit, search } = params;
    const totalCount = await BankAccountRepository.countAllSearch(db, search);

    const bankAccounts = await BankAccountRepository.findMany(db, params);

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: bankAccounts,
      meta: {
        total: totalCount,
        limit,
        page,
        lastPage,
      },
    };
  };

  static getById = async (
    db: DBClient,
    bankAccountId: string,
  ): Promise<BankAccountResponse> => {
    const bankAccount = await BankAccountRepository.findUniqueId(
      db,
      bankAccountId,
    );

    return this.checkNotNull(bankAccount, this.baseModel);
  };

  static create = async (
    db: DBClient,
    request: CreateBankAccountRequest,
  ): Promise<CreateBankAccountResponse> => {
    if (request.accountNumber) {
      const isBankAccountByAccountNumberExists =
        await BankAccountRepository.countUniqueAccountNumber(
          db,
          request.accountNumber,
        );

      await this.checkExists(
        isBankAccountByAccountNumberExists !== 0,
        this.baseModel,
        "CONFLICT",
      );
    }

    const bankAccount = await BankAccountRepository.insert(db, request);

    return bankAccount;
  };

  static update = async (
    db: DBClient,
    bankAccountId: string,
    request: UpdateBankAccountRequest,
  ): Promise<UpdateBankAccountResponse> => {
    await this.checkBankAccountExists(db, bankAccountId);

    const bankAccount = await BankAccountRepository.update(
      db,
      bankAccountId,
      request,
    );

    return bankAccount;
  };

  static delete = async (
    db: DBClient,
    request: DeleteBankAccountRequest,
  ): Promise<DeleteBankAccountResponse> => {
    await this.checkBankAccountExists(db, request.id);

    const bankAccount = await BankAccountRepository.destroy(db, request);

    return bankAccount;
  };

  static deleteMany = async (
    db: DBClient,
    request: DeleteBankAccountsRequest,
  ): Promise<DeleteBankAccountsResponse> => {
    await Promise.all(
      request.ids.map(async (id) => {
        await this.checkBankAccountExists(db, id);
      }),
    );

    const bankAccounts = await BankAccountRepository.destroyMany(db, request);

    return bankAccounts;
  };
}
