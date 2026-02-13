import { env } from "@/configs/env";
import serverI18n from "@/lib/i18n/server";
import { supabaseAdminClient } from "@/lib/supabase/server";
import type { CreateUserResponse, RegisterRequest } from "@/server/models";
import { capitalizeSentence } from "@/utils";
import { TRPCError } from "@trpc/server";
import { BaseService } from "../common";
import { SettingsService } from "../settings";
import { UserRepository, UserService } from "../user";
import { type DBClient } from "./../../db/index";
import type { UserRole } from "@/lib/supabase/middleware";

export class AuthService extends BaseService {
  static register = async (
    db: DBClient,
    request: RegisterRequest,
    role: UserRole,
  ): Promise<CreateUserResponse> => {
    const { email, password, confirmPassword } = request;

    if (password !== confirmPassword) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: capitalizeSentence(
          serverI18n.t(
            "schemas.validation.password.confirmPassword.doNotMatch",
          ),
        ),
      });
    }

    const isUserByEmailExists = await UserRepository.countUniqueEmail(
      db,
      email,
    );

    if (isUserByEmailExists !== 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: serverI18n.t("errors.messages.email.conflict"),
      });
    }

    let userId = "";

    try {
      const { data: registeredData, error: registeredError } =
        await supabaseAdminClient.auth.admin.createUser({
          email,
          password,
          email_confirm: role === "admin" ? true : false,
          app_metadata: {
            role: role,
          },
        });

      if (registeredData.user) userId = registeredData.user.id;

      if (registeredError) throw registeredError;

      const user = await UserService.create(db, userId, {
        email,
        provider: "EMAIL",
        role: role === "admin" ? "ADMIN" : "CUSTOMER",
      });

      await SettingsService.create(db, userId, {
        theme: "SYSTEM",
        language: "ID",
        notification: true,
      });

      return user;
    } catch (error) {
      if (userId) {
        await supabaseAdminClient.auth.admin.deleteUser(userId);
      }
      throw error;
    }
  };

  static registerAdmin = async (db: DBClient, request: RegisterRequest) => {
    const { email, password, confirmPassword } = request;

    await this.register(db, { email, password, confirmPassword }, "admin");
  };

  static registerCustomer = async (db: DBClient, request: RegisterRequest) => {
    const { email, password, confirmPassword } = request;

    try {
      await this.register(db, { email, password, confirmPassword }, "customer");

      const { error: sendEmailError } = await supabaseAdminClient.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${env.NEXT_PUBLIC_BASE_URL}/login`,
        },
      });

      if (sendEmailError) throw sendEmailError;
    } catch (error) {
      throw error;
    }
  };
}
