import type { DBClient } from "@/server/db";
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

export class GuarantorRepository {
  protected static orQuery = ["fullName", "nationalId"];

  static findMany = async (
    db: DBClient,
    params: QueryParams,
  ): Promise<GuarantorResponse[]> => {
    const { page, limit, search, sort } = params;

    const skip = (page - 1) * limit;

    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const guarantors = await db.guarantor.findMany({
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
        employmentType: true,
        employmentName: true,
        employmentPeriod: true,
        relationship: true,
        customerId: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip,
      orderBy: sort.map((s) => ({ [s.id]: s.desc ? "desc" : "asc" })),
    });

    return guarantors;
  };

  static findUniqueId = async (
    db: DBClient,
    guarantorId: string,
  ): Promise<GuarantorResponse | null> => {
    const guarantor = await db.guarantor.findUnique({
      where: { id: guarantorId },
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
        employmentType: true,
        employmentName: true,
        employmentPeriod: true,
        relationship: true,
        customerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return guarantor;
  };

  static findUniqueNationalId = async (
    db: DBClient,
    nationalId: string,
  ): Promise<GuarantorResponse | null> => {
    const guarantor = await db.guarantor.findUnique({
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
        employmentType: true,
        employmentName: true,
        employmentPeriod: true,
        relationship: true,
        customerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return guarantor;
  };

  static countAllSearch = async (
    db: DBClient,
    search?: string,
  ): Promise<number> => {
    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const guarantorsCount = await db.guarantor.count({
      where: { ...(search && { OR: orQuery }) },
    });

    return guarantorsCount;
  };

  static countUniqueId = async (
    db: DBClient,
    guarantorId: string,
  ): Promise<number> => {
    const guarantorsCount = await db.guarantor.count({
      where: { id: guarantorId },
    });

    return guarantorsCount;
  };

  static countUniqueNationalId = async (
    db: DBClient,
    nationalId: string,
  ): Promise<number> => {
    const guarantorsCount = await db.guarantor.count({
      where: { nationalId },
    });

    return guarantorsCount;
  };

  static insert = async (
    db: DBClient,
    request: CreateGuarantorRequest,
  ): Promise<CreateGuarantorResponse> => {
    const guarantor = await db.guarantor.create({
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
        employmentType: true,
        employmentName: true,
        employmentPeriod: true,
        relationship: true,
        customerId: true,
        createdAt: true,
      },
    });

    return guarantor;
  };

  static update = async (
    db: DBClient,
    guarantorId: string,
    request: UpdateGuarantorRequest,
  ): Promise<UpdateGuarantorResponse> => {
    const guarantor = await db.guarantor.update({
      where: { id: guarantorId },
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
        employmentType: true,
        employmentName: true,
        employmentPeriod: true,
        relationship: true,
        customerId: true,
        updatedAt: true,
      },
    });

    return guarantor;
  };

  static destroy = async (
    db: DBClient,
    request: DeleteGuarantorRequest,
  ): Promise<DeleteGuarantorResponse> => {
    const guarantor = await db.guarantor.delete({
      where: { id: request.id },
      select: { id: true },
    });

    return guarantor;
  };

  static destroyMany = async (
    db: DBClient,
    request: DeleteGuarantorsRequest,
  ): Promise<DeleteGuarantorsResponse> => {
    const guarantors = await db.guarantor.findMany({
      where: { id: { in: request.ids } },
      select: { id: true },
    });

    await db.guarantor.deleteMany({ where: { id: { in: request.ids } } });

    return guarantors;
  };
}
