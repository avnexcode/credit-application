import serverI18n from "@/lib/i18n/server";
import { supabaseAdminClient } from "@/lib/supabase/server";
import type { DBClient } from "@/server/db";
import type {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserResponse,
} from "@/server/models";
import { BaseService } from "../common";
import { UserRepository } from "./user.repository";
import { FileService } from "@/server/services";
import { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import { SettingsService } from "../settings";

export class UserService extends BaseService {
  protected static baseModel = serverI18n.t("models.user.title");

  static updateUsername = async (userId: string, username: string) => {
    const { error: updateUserError } =
      await supabaseAdminClient.auth.admin.updateUserById(userId, {
        user_metadata: {
          display_name: username,
        },
      });

    if (updateUserError) throw updateUserError;
  };

  static getById = async (
    db: DBClient,
    userId: string,
  ): Promise<UserResponse> => {
    const user = await UserRepository.findUniqueId(db, userId);

    return this.checkNotNull(user, this.baseModel);
  };

  static create = async (
    db: DBClient,
    userId: string,
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> => {
    const username = "user-" + userId.split("-").pop();

    try {
      const user = await UserRepository.insert(db, userId, username, request);

      await this.updateUsername(userId, username);

      return user;
    } catch (error) {
      throw error;
    }
  };

  static update = async (
    db: DBClient,
    userId: string,
    request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> => {
    const existingUser = await this.getById(db, userId);

    const isUserExistsByUsername = await UserRepository.countUniqueUsername(
      db,
      request?.username ?? "",
    );

    await this.checkExists(
      isUserExistsByUsername !== 0 &&
        request.username !== existingUser.username,
      this.baseModel,
      "CONFLICT",
    );

    try {
      const user = await UserRepository.update(db, userId, request);

      if (request.username) {
        await this.updateUsername(userId, request.username);
      }

      return user;
    } catch (error) {
      throw error;
    }
  };

  static delete = async (
    db: DBClient,
    request: DeleteUserRequest,
  ): Promise<DeleteUserResponse> => {
    const isUserExists = await UserRepository.countUniqueId(db, request.id);

    await this.checkExists(isUserExists === 0, this.baseModel);

    const settings = await SettingsService.getByUser(db, request.id);

    try {
      const user = await UserRepository.destroy(db, request);

      await SettingsService.delete(db, user.id, { id: settings.id });

      if (user.image) {
        await FileService.deleteImageByUrl(SUPABASE_BUCKET.Profile, user.image);
      }

      return user;
    } catch (error) {
      throw error;
    }
  };
}
