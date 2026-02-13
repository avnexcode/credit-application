import { UserService } from "@/server/features/user";
import { errorFilter } from "@/server/filters";
import type { UserResponse } from "@/server/models";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";
import { updateUserRequest } from "@/server/validations";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(
    async ({ ctx }): Promise<UserResponse> => {
      const { db, auth } = ctx;
      try {
        const user = await UserService.getById(db, auth.id);
        return user;
      } catch (error) {
        return errorFilter(error);
      }
    },
  ),

  updateProfile: protectedProcedure
    .input(
      z.object({
        request: updateUserRequest,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, auth } = ctx;
      const { request } = input;
      try {
        const user = await UserService.update(db, auth.id, request);
        return user;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
