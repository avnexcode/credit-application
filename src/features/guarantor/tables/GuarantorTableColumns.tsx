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
import {
  getEmploymentType,
  getGender,
  getMaritalStatus,
} from "@/features/customer/utils";
import { formatDate, getRelationship } from "@/utils";
import { createColumnHelper, type Column } from "@tanstack/react-table";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteGuarantorDialog } from "../components";
import { useDeleteGuarantor } from "../hooks";
import type { GuarantorResponse } from "../types";

export const createGuarantorTableColumns = () => {
  const { t } = useTranslation();
  const { onDelete, isPending } = useDeleteGuarantor();
  const columnHelper = createColumnHelper<GuarantorResponse>();

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
      meta: { label: t("models.guarantor.fields.fullName") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          className="capitalize"
          column={column}
          label={t("models.guarantor.fields.fullName")}
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span className="capitalize">{value}</span>;
      },
    }),

    columnHelper.accessor("nationalId", {
      meta: { label: t("models.guarantor.fields.nationalId") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.nationalId")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value}</span>;
      },
    }),

    columnHelper.accessor("birthPlace", {
      meta: { label: t("models.guarantor.fields.birthPlace") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.birthPlace")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span className="capitalize">{value}</span>;
      },
    }),

    columnHelper.accessor("birthDate", {
      meta: { label: t("models.guarantor.fields.birthDate") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.birthDate")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return value && <span>{formatDate(value, "full")}</span>;
      },
    }),

    columnHelper.accessor("gender", {
      meta: { label: t("models.guarantor.fields.gender") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.gender")}
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
      meta: { label: t("models.guarantor.fields.age") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.age")}
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
      meta: { label: t("models.guarantor.fields.phone") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.phone")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value}</span>;
      },
    }),

    columnHelper.accessor("email", {
      meta: { label: t("models.guarantor.fields.email") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.email")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{value}</span>;
      },
    }),

    columnHelper.accessor("maritalStatus", {
      meta: { label: t("models.guarantor.fields.maritalStatus") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.maritalStatus")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{getMaritalStatus({ maritalStatus: value })}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("employmentType", {
      meta: { label: t("models.guarantor.fields.employmentType") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.employmentType")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span>{getEmploymentType({ employmentType: value })}</span>;
      },
      size: 20,
    }),

    columnHelper.accessor("employmentName", {
      meta: { label: t("models.guarantor.fields.employmentName") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.employmentName")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span className="capitalize">{value}</span>;
      },
    }),

    columnHelper.accessor("relationship", {
      meta: { label: t("models.guarantor.fields.relationship") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.relationship")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return (
          <span className="capitalize">
            {getRelationship({ relationship: value })}
          </span>
        );
      },
    }),

    columnHelper.accessor("createdAt", {
      meta: { label: t("models.guarantor.fields.createdAt") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.createdAt")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return value && <span>{formatDate(value, "full")}</span>;
      },
    }),

    columnHelper.accessor("updatedAt", {
      meta: { label: t("models.guarantor.fields.updatedAt") },
      header: ({ column }: { column: Column<GuarantorResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.guarantor.fields.updatedAt")}
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
        const guarantor = info.row.original;
        const guarantorUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/guarantor/${guarantor.id}`;
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
                  <Link href={`${guarantorUrl}/view`}>
                    <Icon name="ScanEye" className="mr-2 h-4 w-4" />
                    {t("tables.columns.detail")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${guarantorUrl}/edit`}>
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
            <DeleteGuarantorDialog
              onDelete={() => {
                handleDelete(guarantor.id);
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
