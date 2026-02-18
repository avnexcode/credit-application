import type { DBClient } from "@/server/db";
import type {
  CreateCustomerRequest,
  CreateCustomerResponse,
  CustomerResponse,
  DeleteCustomerRequest,
  DeleteCustomerResponse,
  DeleteCustomersRequest,
  DeleteCustomersResponse,
  QueryParams,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
} from "@/server/models";

export class CustomerRepository {
  protected static orQuery = ["fullName", "nationalId"];

  static findMany = async (
    db: DBClient,
    params: QueryParams,
  ): Promise<CustomerResponse[]> => {
    const { page, limit, search, sort } = params;

    const skip = (page - 1) * limit;

    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const customers = await db.customer.findMany({
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
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip,
      orderBy: sort.map((s) => ({ [s.id]: s.desc ? "desc" : "asc" })),
    });

    return customers;
  };

  static findUniqueId = async (
    db: DBClient,
    customerId: string,
  ): Promise<CustomerResponse | null> => {
    const customer = await db.customer.findUnique({
      where: { id: customerId },
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
        createdAt: true,
        updatedAt: true,
      },
    });

    return customer;
  };

  static findUniqueNationalId = async (
    db: DBClient,
    nationalId: string,
  ): Promise<CustomerResponse | null> => {
    const customer = await db.customer.findUnique({
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
        createdAt: true,
        updatedAt: true,
      },
    });

    return customer;
  };

  static countUniqueId = async (
    db: DBClient,
    customerId: string,
  ): Promise<number> => {
    const customersCount = await db.customer.count({
      where: { id: customerId },
    });

    return customersCount;
  };

  static countUniqueNationalId = async (
    db: DBClient,
    nationalId: string,
  ): Promise<number> => {
    const customersCount = await db.customer.count({
      where: { nationalId },
    });

    return customersCount;
  };

  static countAllSearch = async (
    db: DBClient,
    search?: string,
  ): Promise<number> => {
    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const customersCount = await db.customer.count({
      where: { ...(search && { OR: orQuery }) },
    });

    return customersCount;
  };

  static insert = async (
    db: DBClient,
    request: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> => {
    const customer = await db.customer.create({
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
        createdAt: true,
        userId: true,
      },
    });

    return customer;
  };

  static update = async (
    db: DBClient,
    customerId: string,
    request: UpdateCustomerRequest,
  ): Promise<UpdateCustomerResponse> => {
    const customer = await db.customer.update({
      where: { id: customerId },
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
        updatedAt: true,
        userId: true,
      },
    });

    return customer;
  };

  static destroy = async (
    db: DBClient,
    request: DeleteCustomerRequest,
  ): Promise<DeleteCustomerResponse> => {
    const customer = await db.customer.delete({
      where: { id: request.id },
      select: { id: true },
    });

    return customer;
  };

  static destroyMany = async (
    db: DBClient,
    request: DeleteCustomersRequest,
  ): Promise<DeleteCustomersResponse> => {
    const customers = await db.customer.findMany({
      where: { id: { in: request.ids } },
      select: { id: true },
    });

    await db.customer.deleteMany({ where: { id: { in: request.ids } } });

    return customers;
  };
}
