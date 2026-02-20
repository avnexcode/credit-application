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
import { getGender, getMaritalStatus } from "@/lib/get-enum-label";
import { formatDate } from "@/utils";
import { createColumnHelper, type Column } from "@tanstack/react-table";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteAdminDialog } from "../components";
import { useDeleteAdmin } from "../hooks";
import type { AdminResponse } from "../types";

export const createAdminTableColumns = () => {
  const { t } = useTranslation();
  const { onDelete, isPending } = useDeleteAdmin();
  const columnHelper = createColumnHelper<AdminResponse>();

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

    columnHelper.accessor("fullName", {
      meta: { label: t("models.customer.fields.fullName") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          className="capitalize"
          column={column}
          label={t("models.customer.fields.fullName")}
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span className="capitalize">{value}</span>;
      },
    }),

    columnHelper.accessor("nationalId", {
      meta: { label: t("models.customer.fields.nationalId") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.nationalId")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value}</span>;
      },
    }),

    columnHelper.accessor("birthPlace", {
      meta: { label: t("models.customer.fields.birthPlace") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.birthPlace")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span className="capitalize">{value}</span>;
      },
    }),

    columnHelper.accessor("birthDate", {
      meta: { label: t("models.customer.fields.birthDate") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.birthDate")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return value && <span>{formatDate(value, "full")}</span>;
      },
    }),

    columnHelper.accessor("gender", {
      meta: { label: t("models.customer.fields.gender") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.gender")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{getGender({ gender: value })}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("age", {
      meta: { label: t("models.customer.fields.age") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.age")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("phone", {
      meta: { label: t("models.customer.fields.phone") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.phone")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value}</span>;
      },
    }),

    columnHelper.accessor("email", {
      meta: { label: t("models.customer.fields.email") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.email")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value}</span>;
      },
    }),

    columnHelper.accessor("maritalStatus", {
      meta: { label: t("models.customer.fields.maritalStatus") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.maritalStatus")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{getMaritalStatus({ maritalStatus: value })}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("createdAt", {
      meta: { label: t("models.customer.fields.createdAt") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.createdAt")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return value && <span>{formatDate(value, "full")}</span>;
      },
    }),

    columnHelper.accessor("updatedAt", {
      meta: { label: t("models.customer.fields.updatedAt") },
      header: ({ column }: { column: Column<AdminResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.customer.fields.updatedAt")}
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
        const admin = info.row.original;
        const adminUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/${admin.id}`;
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
                  <Link href={`${adminUrl}/view`}>
                    <Icon name="ScanEye" className="mr-2 h-4 w-4" />
                    {t("tables.columns.detail")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${adminUrl}/edit`}>
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
            <DeleteAdminDialog
              onDelete={() => {
                handleDelete(admin.id);
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
