import {
  DataTable,
  DataTableSortList,
  DataTableToolbar,
} from "@/components/data-table";
import { useDataTable, useQueryParams } from "@/hooks";
import type { QueryResponse } from "@/interfaces";
import type { AdminResponse } from "../types";
import { AdminTableActionBar } from "./AdminTableAction";
import { createAdminTableColumns } from "./AdminTableColumns";

type AdminTableProps = {
  admins?: QueryResponse<AdminResponse>;
};

export const AdminTable = ({ admins }: AdminTableProps) => {
  const { queryParams } = useQueryParams();
  const { columns } = createAdminTableColumns();

  const { table } = useDataTable({
    data: admins?.data ?? [],
    columns,
    pageCount: admins?.meta.lastPage ?? 1,
    rowCount: admins?.meta.total,
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
        createdAt: false,
        updatedAt: false,
      },
    },
    queryKeys: {
      perPage: "limit",
    },
  });

  return (
    <DataTable table={table} actionBar={<AdminTableActionBar table={table} />}>
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
};
