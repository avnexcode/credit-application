import { AuthService } from "@/server/features/auth";
import { errorFilter } from "@/server/filters";
import { registerRequest } from "@/server/validations";
import z from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  registerAdmin: publicProcedure
    .input(z.object({ request: registerRequest }))
    .mutation(async ({ ctx, input }): Promise<void> => {
      const { db } = ctx;
      const { request } = input;
      try {
        await db.$transaction(async (tx) => {
          await AuthService.registerAdmin(tx, request);
        });
      } catch (error) {
        return errorFilter(error);
      }
    }),

  registerCustomer: publicProcedure
    .input(z.object({ request: registerRequest }))
    .mutation(async ({ ctx, input }): Promise<void> => {
      const { db } = ctx;
      const { request } = input;
      try {
        await db.$transaction(async (tx) => {
          await AuthService.registerCustomer(tx, request);
        });
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
