import { BankAccountService } from "@/server/features/bank-account";
import { errorFilter } from "@/server/filters";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateBankAccountResponse,
  BankAccountResponse,
  DeleteBankAccountResponse,
  DeleteBankAccountsResponse,
  UpdateBankAccountResponse,
} from "@/server/models";
import {
  createBankAccountRequest,
  deleteBankAccountRequest,
  deleteBankAccountsRequest,
  queryParams,
  updateBankAccountRequest,
} from "@/server/validations";
import z from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

const idValidation = z.uuid().min(1);

export const bankAccountRouter = createTRPCRouter({
  getAll: adminProcedure
    .input(z.object({ params: queryParams }))
    .query(
      async ({ ctx, input }): Promise<QueryResponse<BankAccountResponse>> => {
        const { db } = ctx;
        const { params } = input;
        try {
          const bankAccounts = await BankAccountService.getAll(db, params);
          return bankAccounts;
        } catch (error) {
          return errorFilter(error);
        }
      },
    ),

  getById: adminProcedure
    .input(z.object({ id: idValidation }))
    .query(async ({ ctx, input }): Promise<BankAccountResponse> => {
      const { db } = ctx;
      const { id } = input;
      try {
        const bankAccount = await BankAccountService.getById(db, id);
        return bankAccount;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getByUser: protectedProcedure.query(async ({ ctx }) => {
    const { db, auth } = ctx;
    try {
    } catch (error) {
      return errorFilter(error);
    }
  }),

  create: protectedProcedure
    .input(z.object({ request: createBankAccountRequest }))
    .mutation(async ({ ctx, input }): Promise<CreateBankAccountResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const bankAccount = await BankAccountService.create(db, request);
        return bankAccount;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: protectedProcedure
    .input(z.object({ id: idValidation, request: updateBankAccountRequest }))
    .mutation(async ({ ctx, input }): Promise<UpdateBankAccountResponse> => {
      const { db } = ctx;
      const { id, request } = input;
      try {
        const bankAccount = await BankAccountService.update(db, id, request);
        return bankAccount;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: adminProcedure
    .input(z.object({ request: deleteBankAccountRequest }))
    .mutation(async ({ ctx, input }): Promise<DeleteBankAccountResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const bankAccount = await BankAccountService.delete(db, request);
        return bankAccount;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  deleteMany: adminProcedure
    .input(z.object({ request: deleteBankAccountsRequest }))
    .mutation(async ({ ctx, input }): Promise<DeleteBankAccountsResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const bankAccount = await BankAccountService.deleteMany(db, request);
        return bankAccount;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
