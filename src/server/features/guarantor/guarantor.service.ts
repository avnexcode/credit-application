import serverI18n from "@/lib/i18n/server";
import type { DBClient } from "@/server/db";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateGuarantorRequest,
  CreateGuarantorResponse,
  DeleteGuarantorRequest,
  DeleteGuarantorResponse,
  DeleteGuarantorsRequest,
  DeleteGuarantorsResponse,
  GuarantorResponse,
  QueryParams,
  UpdateGuarantorRequest,
  UpdateGuarantorResponse,
} from "@/server/models";
import { BaseService } from "../common";
import { GuarantorRepository } from "./guarantor.repository";

export class GuarantorService extends BaseService {
  protected static baseModel = serverI18n.t("models.guarantor.title");

  protected static checkGuarantorExists = async (
    db: DBClient,
    guarantorId: string,
  ): Promise<void> => {
    const isGuarantorExists = await GuarantorRepository.countUniqueId(
      db,
      guarantorId,
    );

    await this.checkExists(isGuarantorExists === 0, this.baseModel);
  };

  static getAll = async (
    db: DBClient,
    params: QueryParams,
  ): Promise<QueryResponse<GuarantorResponse>> => {
    const { page, limit, search } = params;
    const totalCount = await GuarantorRepository.countAllSearch(db, search);

    const guarantors = await GuarantorRepository.findMany(db, params);

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: guarantors,
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
    guarantorId: string,
  ): Promise<GuarantorResponse> => {
    const guarantor = await GuarantorRepository.findUniqueId(db, guarantorId);

    return this.checkNotNull(guarantor, this.baseModel);
  };

  static create = async (
    db: DBClient,
    request: CreateGuarantorRequest,
  ): Promise<CreateGuarantorResponse> => {
    if (request.nationalId) {
      const isGuarantorByNationalIdExists =
        await GuarantorRepository.countUniqueNationalId(db, request.nationalId);

      await this.checkExists(
        isGuarantorByNationalIdExists !== 0,
        this.baseModel,
        "CONFLICT",
      );
    }

    const guarantor = await GuarantorRepository.insert(db, request);

    return guarantor;
  };

  static update = async (
    db: DBClient,
    guarantorId: string,
    request: UpdateGuarantorRequest,
  ): Promise<UpdateGuarantorResponse> => {
    await this.checkGuarantorExists(db, guarantorId);

    const guarantor = await GuarantorRepository.update(
      db,
      guarantorId,
      request,
    );

    return guarantor;
  };

  static delete = async (
    db: DBClient,
    request: DeleteGuarantorRequest,
  ): Promise<DeleteGuarantorResponse> => {
    await this.checkGuarantorExists(db, request.id);

    const guarantor = await GuarantorRepository.destroy(db, request);

    return guarantor;
  };

  static deleteMany = async (
    db: DBClient,
    request: DeleteGuarantorsRequest,
  ): Promise<DeleteGuarantorsResponse> => {
    await Promise.all(
      request.ids.map(async (id) => {
        await this.checkGuarantorExists(db, id);
      }),
    );

    const guarantors = await GuarantorRepository.destroyMany(db, request);

    return guarantors;
  };
}
