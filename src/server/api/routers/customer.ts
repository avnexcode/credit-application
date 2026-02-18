import { CustomerService } from "@/server/features/customer";
import { errorFilter } from "@/server/filters";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateCustomerResponse,
  CustomerResponse,
  DeleteCustomerResponse,
  DeleteCustomersResponse,
  UpdateCustomerResponse,
} from "@/server/models";
import {
  createCustomerRequest,
  deleteCustomerRequest,
  deleteCustomersRequest,
  queryParams,
  updateCustomerRequest,
} from "@/server/validations";
import z from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

const idValidation = z.uuid().min(1);

export const customerRouter = createTRPCRouter({
  getAll: adminProcedure
    .input(z.object({ params: queryParams }))
    .query(async ({ ctx, input }): Promise<QueryResponse<CustomerResponse>> => {
      const { db } = ctx;
      const { params } = input;
      try {
        const customers = await CustomerService.getAll(db, params);
        return customers;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: adminProcedure
    .input(z.object({ id: idValidation }))
    .query(async ({ ctx, input }): Promise<CustomerResponse> => {
      const { db } = ctx;
      const { id } = input;
      try {
        const customer = await CustomerService.getById(db, id);
        return customer;
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
    .input(z.object({ request: createCustomerRequest }))
    .mutation(async ({ ctx, input }): Promise<CreateCustomerResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const customer = await CustomerService.create(db, request);
        return customer;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: protectedProcedure
    .input(z.object({ id: idValidation, request: updateCustomerRequest }))
    .mutation(async ({ ctx, input }): Promise<UpdateCustomerResponse> => {
      const { db } = ctx;
      const { id, request } = input;
      try {
        const customer = await CustomerService.update(db, id, request);
        return customer;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: adminProcedure
    .input(z.object({ request: deleteCustomerRequest }))
    .mutation(async ({ ctx, input }): Promise<DeleteCustomerResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const customer = await CustomerService.delete(db, request);
        return customer;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  deleteMany: adminProcedure
    .input(z.object({ request: deleteCustomersRequest }))
    .mutation(async ({ ctx, input }): Promise<DeleteCustomersResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const customer = await CustomerService.deleteMany(db, request);
        return customer;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
