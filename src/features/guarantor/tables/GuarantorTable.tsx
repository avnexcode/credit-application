import {
  DataTable,
  DataTableSortList,
  DataTableToolbar,
} from "@/components/data-table";
import { useDataTable, useQueryParams } from "@/hooks";
import type { QueryResponse } from "@/interfaces";
import type { GuarantorResponse } from "../types";
import { GuarantorTableActionBar } from "./GuarantorTableAction";
import { createGuarantorTableColumns } from "./GuarantorTableColumns";

type GuarantorTableProps = {
  guarantors?: QueryResponse<GuarantorResponse>;
};

export const GuarantorTable = ({ guarantors }: GuarantorTableProps) => {
  const { queryParams } = useQueryParams();
  const { columns } = createGuarantorTableColumns();

  const { table } = useDataTable({
    data: guarantors?.data ?? [],
    columns,
    pageCount: guarantors?.meta.lastPage ?? 1,
    rowCount: guarantors?.meta.total,
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
      actionBar={<GuarantorTableActionBar table={table} />}
    >
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
};
