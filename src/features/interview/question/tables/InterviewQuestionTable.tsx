import {
  DataTable,
  DataTableSortList,
  DataTableToolbar,
} from "@/components/data-table";
import { useDataTable, useQueryParams } from "@/hooks";
import type { QueryResponse } from "@/interfaces";
import type { InterviewQuestionResponse } from "../types";
import { InterviewQuestionTableActionBar } from "./InterviewQuestionTableAction";
import { createInterviewQuestionTableColumns } from "./InterviewQuestionTableColumns";

type InterviewQuestionTableProps = {
  interviewQuestions?: QueryResponse<InterviewQuestionResponse>;
};

export const InterviewQuestionTable = ({
  interviewQuestions,
}: InterviewQuestionTableProps) => {
  const { queryParams } = useQueryParams();
  const { columns } = createInterviewQuestionTableColumns();

  const { table } = useDataTable({
    data: interviewQuestions?.data ?? [],
    columns,
    pageCount: interviewQuestions?.meta.lastPage ?? 1,
    rowCount: interviewQuestions?.meta.total,
    initialState: {
      pagination: {
        pageIndex: (queryParams.page || 1) - 1,
        pageSize: queryParams.limit || 10,
      },
      columnVisibility: {
        category: false,
        options: false,
        orderNumber: false,
        placeholder: false,
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
      actionBar={<InterviewQuestionTableActionBar table={table} />}
    >
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
};
