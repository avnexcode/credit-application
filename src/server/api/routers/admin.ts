import { AdminService } from "@/server/features/admin";
import { errorFilter } from "@/server/filters";
import type {
  AdminResponse,
  CreateAdminResponse,
  DeleteAdminResponse,
  DeleteAdminsResponse,
  UpdateAdminResponse,
} from "@/server/models";
import {
  createAdminRequest,
  deleteAdminRequest,
  deleteAdminsRequest,
  queryParams,
  updateAdminRequest,
} from "@/server/validations";
import z from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

const idValidation = z.uuid().min(1);

export const adminRouter = createTRPCRouter({
  getAll: adminProcedure
    .input(z.object({ params: queryParams }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { params } = input;
      try {
        const admins = await AdminService.getAll(db, params);
        return admins;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: adminProcedure
    .input(z.object({ id: idValidation }))
    .query(async ({ ctx, input }): Promise<AdminResponse> => {
      const { db } = ctx;
      const { id } = input;
      try {
        const admin = await AdminService.getById(db, id);
        return admin;
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
    .input(z.object({ request: createAdminRequest }))
    .mutation(async ({ ctx, input }): Promise<CreateAdminResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const admin = await AdminService.create(db, request);
        return admin;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: protectedProcedure
    .input(z.object({ id: idValidation, request: updateAdminRequest }))
    .mutation(async ({ ctx, input }): Promise<UpdateAdminResponse> => {
      const { db } = ctx;
      const { id, request } = input;
      try {
        const admin = await AdminService.update(db, id, request);
        return admin;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: adminProcedure
    .input(z.object({ request: deleteAdminRequest }))
    .mutation(async ({ ctx, input }): Promise<DeleteAdminResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const admin = await AdminService.delete(db, request);
        return admin;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  deleteMany: adminProcedure
    .input(z.object({ request: deleteAdminsRequest }))
    .mutation(async ({ ctx, input }): Promise<DeleteAdminsResponse> => {
      const { db } = ctx;
      const { request } = input;
      try {
        const admin = await AdminService.deleteMany(db, request);
        return admin;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
