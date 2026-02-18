import serverI18n from "@/lib/i18n/server";
import type { DBClient } from "@/server/db";
import type { QueryResponse } from "@/server/interfaces";
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
import { BaseService } from "../common";
import { CustomerRepository } from "./customer.repository";

export class CustomerService extends BaseService {
  protected static baseModel = serverI18n.t("models.customer.title");

  protected static checkCustomerExists = async (
    db: DBClient,
    customerId: string,
  ): Promise<void> => {
    const isCustomerExists = await CustomerRepository.countUniqueId(
      db,
      customerId,
    );

    await this.checkExists(isCustomerExists === 0, this.baseModel);
  };

  static getAll = async (
    db: DBClient,
    params: QueryParams,
  ): Promise<QueryResponse<CustomerResponse>> => {
    const { page, limit, search } = params;
    const totalCount = await CustomerRepository.countAllSearch(db, search);

    const customers = await CustomerRepository.findMany(db, params);

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: customers,
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
    customerId: string,
  ): Promise<CustomerResponse> => {
    const customer = await CustomerRepository.findUniqueId(db, customerId);

    return this.checkNotNull(customer, this.baseModel);
  };

  static create = async (
    db: DBClient,
    request: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> => {
    if (request.nationalId) {
      const isCustomerByNationalIdExists =
        await CustomerRepository.countUniqueNationalId(db, request.nationalId);

      await this.checkExists(
        isCustomerByNationalIdExists !== 0,
        this.baseModel,
        "CONFLICT",
      );
    }

    const customer = await CustomerRepository.insert(db, request);

    return customer;
  };

  static update = async (
    db: DBClient,
    customerId: string,
    request: UpdateCustomerRequest,
  ): Promise<UpdateCustomerResponse> => {
    await this.checkCustomerExists(db, customerId);

    const customer = await CustomerRepository.update(db, customerId, request);

    return customer;
  };

  static delete = async (
    db: DBClient,
    request: DeleteCustomerRequest,
  ): Promise<DeleteCustomerResponse> => {
    await this.checkCustomerExists(db, request.id);

    const customer = await CustomerRepository.destroy(db, request);

    return customer;
  };

  static deleteMany = async (
    db: DBClient,
    request: DeleteCustomersRequest,
  ): Promise<DeleteCustomersResponse> => {
    await Promise.all(
      request.ids.map(async (id) => {
        await this.checkCustomerExists(db, id);
      }),
    );

    const customers = await CustomerRepository.destroyMany(db, request);

    return customers;
  };
}
