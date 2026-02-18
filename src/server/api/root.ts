import {
  createCallerFactory,
  createTRPCContext,
  createTRPCRouter,
} from "@/server/api/trpc";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { GetServerSidePropsContext } from "next";
import {
  authRouter,
  customerRouter,
  settingsRouter,
  userRouter,
} from "./routers";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  settings: settingsRouter,
  user: userRouter,
  customer: customerRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

export const createSSRCaller = async (
  context: CreateNextContextOptions | GetServerSidePropsContext,
) => {
  const ctx = await createTRPCContext(context);
  return appRouter.createCaller(ctx);
};
