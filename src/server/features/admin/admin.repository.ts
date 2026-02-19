import type { DBClient } from "@/server/db";
import type {
  AdminResponse,
  CreateAdminRequest,
  CreateAdminResponse,
  DeleteAdminRequest,
  DeleteAdminResponse,
  DeleteAdminsRequest,
  DeleteAdminsResponse,
  QueryParams,
  UpdateAdminRequest,
  UpdateAdminResponse,
} from "@/server/models";

export class AdminRepository {
  protected static orQuery = ["fullName", "nationalId"];

  static findMany = async (
    db: DBClient,
    params: QueryParams,
  ): Promise<AdminResponse[]> => {
    const { page, limit, search, sort } = params;

    const skip = (page - 1) * limit;

    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const admins = await db.admin.findMany({
      where: { ...(search && { OR: orQuery }) },
      select: {
        id: true,
        fullName: true,
        nationalId: true,
        birthPlace: true,
        birthDate: true,
        gender: true,
        phone: true,
        age: true,
        email: true,
        address: true,
        maritalStatus: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip,
      orderBy: sort.map((s) => ({ [s.id]: s.desc ? "desc" : "asc" })),
    });

    return admins;
  };

  static findUniqueId = async (
    db: DBClient,
    adminId: string,
  ): Promise<AdminResponse | null> => {
    const admin = await db.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        fullName: true,
        nationalId: true,
        birthPlace: true,
        birthDate: true,
        gender: true,
        age: true,
        phone: true,
        email: true,
        address: true,
        maritalStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admin;
  };

  static findUniqueNationalId = async (
    db: DBClient,
    nationalId: string,
  ): Promise<AdminResponse | null> => {
    const admin = await db.admin.findUnique({
      where: { nationalId },
      select: {
        id: true,
        fullName: true,
        nationalId: true,
        birthPlace: true,
        birthDate: true,
        gender: true,
        age: true,
        phone: true,
        email: true,
        address: true,
        maritalStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return admin;
  };

  static countAllSearch = async (
    db: DBClient,
    search?: string,
  ): Promise<number> => {
    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const adminsCount = await db.admin.count({
      where: { ...(search && { OR: orQuery }) },
    });

    return adminsCount;
  };

  static countUniqueId = async (
    db: DBClient,
    adminId: string,
  ): Promise<number> => {
    const adminsCount = await db.admin.count({
      where: { id: adminId },
    });

    return adminsCount;
  };

  static countUniqueNationalId = async (
    db: DBClient,
    nationalId: string,
  ): Promise<number> => {
    const adminsCount = await db.admin.count({
      where: { nationalId },
    });

    return adminsCount;
  };

  static insert = async (
    db: DBClient,
    request: CreateAdminRequest,
  ): Promise<CreateAdminResponse> => {
    const admin = await db.admin.create({
      data: { ...request },
      select: {
        id: true,
        fullName: true,
        nationalId: true,
        birthPlace: true,
        birthDate: true,
        gender: true,
        phone: true,
        age: true,
        email: true,
        address: true,
        maritalStatus: true,
        createdAt: true,
        userId: true,
      },
    });

    return admin;
  };

  static update = async (
    db: DBClient,
    adminId: string,
    request: UpdateAdminRequest,
  ): Promise<UpdateAdminResponse> => {
    const admin = await db.admin.update({
      where: { id: adminId },
      data: { ...request },
      select: {
        id: true,
        fullName: true,
        nationalId: true,
        birthPlace: true,
        birthDate: true,
        gender: true,
        phone: true,
        age: true,
        email: true,
        address: true,
        maritalStatus: true,
        updatedAt: true,
        userId: true,
      },
    });

    return admin;
  };

  static destroy = async (
    db: DBClient,
    request: DeleteAdminRequest,
  ): Promise<DeleteAdminResponse> => {
    const admin = await db.admin.delete({
      where: { id: request.id },
      select: { id: true },
    });

    return admin;
  };

  static destroyMany = async (
    db: DBClient,
    request: DeleteAdminsRequest,
  ): Promise<DeleteAdminsResponse> => {
    const admins = await db.admin.findMany({
      where: { id: { in: request.ids } },
      select: { id: true },
    });

    await db.admin.deleteMany({ where: { id: { in: request.ids } } });

    return admins;
  };
}
