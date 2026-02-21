import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { env } from "@/configs/env";
import { getQuestionType } from "@/lib/get-enum-label";
import { formatDate } from "@/utils";
import { createColumnHelper, type Column } from "@tanstack/react-table";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteInterviewQuestionDialog } from "../components";
import { useDeleteInterviewQuestion } from "../hooks";
import type { InterviewQuestionResponse } from "../types";

export const createInterviewQuestionTableColumns = () => {
  const { t } = useTranslation();
  const { onDelete, isPending } = useDeleteInterviewQuestion();
  const columnHelper = createColumnHelper<InterviewQuestionResponse>();

  const handleDelete = useCallback(
    (id: string) => {
      onDelete({ id });
    },
    [onDelete],
  );

  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: 20,
    }),

    columnHelper.accessor("questionText", {
      meta: { label: t("models.interviewQuestion.fields.questionText") },
      header: ({ column }: { column: Column<InterviewQuestionResponse> }) => (
        <DataTableColumnHeader
          className="capitalize"
          column={column}
          label={t("models.interviewQuestion.fields.questionText")}
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span className="capitalize">{value}</span>;
      },
    }),

    columnHelper.accessor("questionType", {
      meta: { label: t("models.interviewQuestion.fields.questionType") },
      header: ({ column }: { column: Column<InterviewQuestionResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.interviewQuestion.fields.questionType")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{getQuestionType({ questionType: value })}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("isRequired", {
      meta: { label: t("models.interviewQuestion.fields.isRequired") },
      header: ({ column }: { column: Column<InterviewQuestionResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.interviewQuestion.fields.isRequired")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value ? "Required" : "Unrequired"}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("isActive", {
      meta: { label: t("models.interviewQuestion.fields.isActive") },
      header: ({ column }: { column: Column<InterviewQuestionResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.interviewQuestion.fields.isActive")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value ? "Active" : "Unactive"}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("orderNumber", {
      meta: { label: t("models.interviewQuestion.fields.orderNumber") },
      header: ({ column }: { column: Column<InterviewQuestionResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.interviewQuestion.fields.orderNumber")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("options", {
      meta: { label: t("models.interviewQuestion.fields.options") },
      header: ({ column }: { column: Column<InterviewQuestionResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.interviewQuestion.fields.options")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value?.length ? value.join(" | ") : "-"}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("placeholder", {
      meta: { label: t("models.interviewQuestion.fields.placeholder") },
      header: ({ column }: { column: Column<InterviewQuestionResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.interviewQuestion.fields.placeholder")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("createdAt", {
      meta: { label: t("models.interviewQuestion.fields.createdAt") },
      header: ({ column }: { column: Column<InterviewQuestionResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.interviewQuestion.fields.createdAt")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return value && <span>{formatDate(value, "full")}</span>;
      },
    }),

    columnHelper.accessor("updatedAt", {
      meta: { label: t("models.interviewQuestion.fields.updatedAt") },
      header: ({ column }: { column: Column<InterviewQuestionResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.interviewQuestion.fields.updatedAt")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return value && <span>{formatDate(value, "full")}</span>;
      },
    }),

    columnHelper.display({
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: (info) => {
        const interviewQuestion = info.row.original;
        const interviewQuestionUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/interview-question/${interviewQuestion.id}`;
        const [isOpen, setIsOpen] = useState(false);

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Icon name="Ellipsis" className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 *:cursor-pointer"
              >
                <DropdownMenuItem asChild>
                  <Link href={`${interviewQuestionUrl}/view`}>
                    <Icon name="ScanEye" className="mr-2 h-4 w-4" />
                    {t("tables.columns.detail")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${interviewQuestionUrl}/edit`}>
                    <Icon name="SquarePen" className="mr-2 h-4 w-4" />
                    {t("tables.columns.edit")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsOpen(true)}>
                  <Icon name="Trash2" className="mr-2 h-4 w-4" />
                  {t("tables.columns.delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteInterviewQuestionDialog
              onDelete={() => {
                handleDelete(interviewQuestion.id);
                setIsOpen(false);
              }}
              isPending={isPending}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </>
        );
      },
      size: 20,
    }),
  ];

  return { columns };
};
