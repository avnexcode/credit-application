import { GuarantorService } from "@/server/features/guarantor";
import { errorFilter } from "@/server/filters";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateGuarantorResponse,
  DeleteGuarantorResponse,
  DeleteGuarantorsResponse,
  GuarantorResponse,
  UpdateGuarantorResponse,
} from "@/server/models";
import {
  createGuarantorRequest,
  deleteGuarantorRequest,
  deleteGuarantorsRequest,
  queryParams,
  updateGuarantorRequest,
} from "@/server/validations";
import z from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

const idValidation = z.uuid().min(1);

export const guarantorRouter = createTRPCRouter({
  getAll: adminProcedure
    .input(z.object({ params: queryParams }))
    .query(
      async ({ ctx, input }): Promise<QueryResponse<GuarantorResponse>> => {
        const { db } = ctx;
        const { params } = input;
        try {
          const guarantors = await GuarantorService.getAll(db, params);
          return guarantors;
        } catch (error) {
          return errorFilter(error);
        }
      },
    ),

  getById: adminProcedure
    .input(z.object({ id: idValidation }))
    .query(async ({ ctx, input }): Promise<GuarantorResponse> => {
      const { db } = ctx;
      const { id } = input;
      try {
        const guarantor = await GuarantorService.getById(db, id);
        return guarantor;
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
    .input(z.object({ request: createGuarantorRequest }))
    .mutation(async ({ ctx, input }): Promise<CreateGuarantorResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const guarantor = await GuarantorService.create(db, request);
        return guarantor;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: protectedProcedure
    .input(z.object({ id: idValidation, request: updateGuarantorRequest }))
    .mutation(async ({ ctx, input }): Promise<UpdateGuarantorResponse> => {
      const { db } = ctx;
      const { id, request } = input;
      try {
        const guarantor = await GuarantorService.update(db, id, request);
        return guarantor;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: adminProcedure
    .input(z.object({ request: deleteGuarantorRequest }))
    .mutation(async ({ ctx, input }): Promise<DeleteGuarantorResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const guarantor = await GuarantorService.delete(db, request);
        return guarantor;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  deleteMany: adminProcedure
    .input(z.object({ request: deleteGuarantorsRequest }))
    .mutation(async ({ ctx, input }): Promise<DeleteGuarantorsResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const guarantor = await GuarantorService.deleteMany(db, request);
        return guarantor;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
