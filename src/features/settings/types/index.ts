import type { Prisma } from "@prisma";

export type SettingsResponse = Prisma.SettingsGetPayload<{
  select: {
    id: true;
    theme: true;
    language: true;
    notification: true;
  };
}>;
