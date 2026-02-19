import {
  createCallerFactory,
  createTRPCContext,
  createTRPCRouter,
} from "@/server/api/trpc";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { GetServerSidePropsContext } from "next";
import {
  adminRouter,
  authRouter,
  customerRouter,
  guarantorRouter,
  settingsRouter,
  userRouter,
} from "./routers";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  settings: settingsRouter,
  user: userRouter,
  admin: adminRouter,
  customer: customerRouter,
  guarantor: guarantorRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

export const createSSRCaller = async (
  context: CreateNextContextOptions | GetServerSidePropsContext,
) => {
  const ctx = await createTRPCContext(context);
  return appRouter.createCaller(ctx);
};
