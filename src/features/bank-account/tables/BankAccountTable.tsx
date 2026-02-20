import {
  DataTable,
  DataTableSortList,
  DataTableToolbar,
} from "@/components/data-table";
import { useDataTable, useQueryParams } from "@/hooks";
import type { QueryResponse } from "@/interfaces";
import type { BankAccountResponse } from "../types";
import { BankAccountTableActionBar } from "./BankAccountTableAction";
import { createBankAccountTableColumns } from "./BankAccountTableColumns";

type BankAccountTableProps = {
  bankAccounts?: QueryResponse<BankAccountResponse>;
};

export const BankAccountTable = ({ bankAccounts }: BankAccountTableProps) => {
  const { queryParams } = useQueryParams();
  const { columns } = createBankAccountTableColumns();

  const { table } = useDataTable({
    data: bankAccounts?.data ?? [],
    columns,
    pageCount: bankAccounts?.meta.lastPage ?? 1,
    rowCount: bankAccounts?.meta.total,
    initialState: {
      pagination: {
        pageIndex: (queryParams.page || 1) - 1,
        pageSize: queryParams.limit || 10,
      },
      columnVisibility: {
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
      actionBar={<BankAccountTableActionBar table={table} />}
    >
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
};
