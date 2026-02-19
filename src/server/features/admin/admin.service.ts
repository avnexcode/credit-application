import serverI18n from "@/lib/i18n/server";
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
import { BaseService } from "../common";
import { AdminRepository } from "./admin.repository";

export class AdminService extends BaseService {
  protected static baseModel = serverI18n.t("models.admin.title");

  protected static checkAdminExists = async (
    db: DBClient,
    adminId: string,
  ): Promise<void> => {
    const isAdminExists = await AdminRepository.countUniqueId(db, adminId);

    await this.checkExists(isAdminExists === 0, this.baseModel);
  };

  static getAll = async (db: DBClient, params: QueryParams) => {
    const { page, limit, search } = params;
    const totalCount = await AdminRepository.countAllSearch(db, search);

    const admins = await AdminRepository.findMany(db, params);

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: admins,
      meta: {
        total: totalCount,
        limit,
        page,
        lastPage,
      },
    };
  };

  static getById = async (
    db: DBClient,
    adminId: string,
  ): Promise<AdminResponse> => {
    const admin = await AdminRepository.findUniqueId(db, adminId);

    return this.checkNotNull(admin, this.baseModel);
  };

  static create = async (
    db: DBClient,
    request: CreateAdminRequest,
  ): Promise<CreateAdminResponse> => {
    if (request.nationalId) {
      const isAdminByNationalIdExists =
        await AdminRepository.countUniqueNationalId(db, request.nationalId);

      await this.checkExists(
        isAdminByNationalIdExists !== 0,
        this.baseModel,
        "CONFLICT",
      );
    }

    const admin = await AdminRepository.insert(db, request);

    return admin;
  };

  static update = async (
    db: DBClient,
    adminId: string,
    request: UpdateAdminRequest,
  ): Promise<UpdateAdminResponse> => {
    await this.checkAdminExists(db, adminId);

    const admin = await AdminRepository.update(db, adminId, request);

    return admin;
  };

  static delete = async (
    db: DBClient,
    request: DeleteAdminRequest,
  ): Promise<DeleteAdminResponse> => {
    await this.checkAdminExists(db, request.id);

    const admin = await AdminRepository.destroy(db, request);

    return admin;
  };

  static deleteMany = async (
    db: DBClient,
    request: DeleteAdminsRequest,
  ): Promise<DeleteAdminsResponse> => {
    await Promise.all(
      request.ids.map(async (id) => {
        await this.checkAdminExists(db, id);
      }),
    );

    const admins = await AdminRepository.destroyMany(db, request);

    return admins;
  };
}
