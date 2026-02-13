import { type DBClient } from "@/server/db";
import type {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserResponse,
} from "@/server/models";

export class UserRepository {
  static findUniqueId = async (
    db: DBClient,
    userId: string,
  ): Promise<UserResponse | null> => {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        image: true,
        role: true,
        providers: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  };

  static countUniqueId = async (
    db: DBClient,
    userId: string,
  ): Promise<number> => {
    const usersCount = await db.user.count({ where: { id: userId } });

    return usersCount;
  };

  static countUniqueEmail = async (
    db: DBClient,
    email: string,
  ): Promise<number> => {
    const usersCount = await db.user.count({ where: { email } });

    return usersCount;
  };

  static countUniqueUsername = async (
    db: DBClient,
    username: string,
  ): Promise<number> => {
    const usersCount = await db.user.count({ where: { username } });

    return usersCount;
  };

  static insert = async (
    db: DBClient,
    userId: string,
    username: string,
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> => {
    const user = await db.user.create({
      data: {
        id: userId,
        username,
        email: request.email,
        role: request.role,
        providers: [request.provider],
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        image: true,
        role: true,
        providers: true,
        createdAt: true,
      },
    });

    return user;
  };

  static update = async (
    db: DBClient,
    userId: string,
    request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> => {
    const user = await db.user.update({
      where: { id: userId },
      data: {
        ...request,
        ...(request.provider
          ? {
              providers: {
                push: request.provider,
              },
            }
          : {}),
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        image: true,
        role: true,
        providers: true,
        updatedAt: true,
      },
    });

    return user;
  };

  static destroy = async (
    db: DBClient,
    request: DeleteUserRequest,
  ): Promise<DeleteUserResponse> => {
    const user = await db.user.delete({
      where: { id: request.id },
      select: { id: true, image: true },
    });

    return user;
  };
}
