import {
  DataTable,
  DataTableSortList,
  DataTableToolbar,
} from "@/components/data-table";
import { useDataTable, useQueryParams } from "@/hooks";
import type { QueryResponse } from "@/interfaces";
import type { CustomerResponse } from "../types";
import { CustomerTableActionBar } from "./CustomerTableAction";
import { createCustomerTableColumns } from "./CustomerTableColumns";

type CustomerTableProps = {
  customers?: QueryResponse<CustomerResponse>;
};

export const CustomerTable = ({ customers }: CustomerTableProps) => {
  const { queryParams } = useQueryParams();
  const { columns } = createCustomerTableColumns();

  const { table } = useDataTable({
    data: customers?.data ?? [],
    columns,
    pageCount: customers?.meta.lastPage ?? 1,
    rowCount: customers?.meta.total,
    initialState: {
      pagination: {
        pageIndex: (queryParams.page || 1) - 1,
        pageSize: queryParams.limit || 10,
      },
      columnVisibility: {
        birthPlace: false,
        birthDate: false,
        gender: false,
        age: false,
        maritalStatus: false,
        employmentName: false,
        employmentPeriod: false,
        createdAt: false,
        updatedAt: false,
      },
    },
    queryKeys: {
      perPage: "limit",
    },
  });

  return (
    <DataTable
      table={table}
      actionBar={<CustomerTableActionBar table={table} />}
    >
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
};
