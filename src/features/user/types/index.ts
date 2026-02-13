import type { Prisma } from "@prisma";

export type UserResponse = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    email: true;
    avatar: true;
    image: true;
    providers: true;
    role: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
