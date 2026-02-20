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
import { formatDate } from "@/utils";
import { createColumnHelper, type Column } from "@tanstack/react-table";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteBankAccountDialog } from "../components";
import { useDeleteBankAccount } from "../hooks";
import type { BankAccountResponse } from "../types";

export const createBankAccountTableColumns = () => {
  const { t } = useTranslation();
  const { onDelete, isPending } = useDeleteBankAccount();
  const columnHelper = createColumnHelper<BankAccountResponse>();

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

    columnHelper.accessor("accountName", {
      meta: { label: t("models.bankAccount.fields.accountName") },
      header: ({ column }: { column: Column<BankAccountResponse> }) => (
        <DataTableColumnHeader
          className="capitalize"
          column={column}
          label={t("models.bankAccount.fields.accountName")}
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span className="capitalize">{value}</span>;
      },
    }),

    columnHelper.accessor("accountNumber", {
      meta: { label: t("models.bankAccount.fields.accountNumber") },
      header: ({ column }: { column: Column<BankAccountResponse> }) => (
        <DataTableColumnHeader
          className="capitalize"
          column={column}
          label={t("models.bankAccount.fields.accountNumber")}
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return <span className="capitalize">{value}</span>;
      },
    }),

    columnHelper.accessor("isActive", {
      meta: { label: t("models.bankAccount.fields.isActive") },
      header: ({ column }: { column: Column<BankAccountResponse> }) => (
        <DataTableColumnHeader
          className="capitalize"
          column={column}
          label={t("models.bankAccount.fields.isActive")}
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return (
          <span className="capitalize">{value ? "Active" : "Deactive"}</span>
        );
      },
    }),

    columnHelper.accessor("isVerified", {
      meta: { label: t("models.bankAccount.fields.isVerified") },
      header: ({ column }: { column: Column<BankAccountResponse> }) => (
        <DataTableColumnHeader
          className="capitalize"
          column={column}
          label={t("models.bankAccount.fields.isVerified")}
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return (
          <span className="capitalize">
            {value ? "Verified" : "Unverified"}
          </span>
        );
      },
    }),

    columnHelper.accessor("createdAt", {
      meta: { label: t("models.bankAccount.fields.createdAt") },
      header: ({ column }: { column: Column<BankAccountResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.bankAccount.fields.createdAt")}
          className="capitalize"
        />
      ),
      cell: (info) => {
        const value = info.renderValue();
        return value && <span>{formatDate(value, "full")}</span>;
      },
    }),

    columnHelper.accessor("updatedAt", {
      meta: { label: t("models.bankAccount.fields.updatedAt") },
      header: ({ column }: { column: Column<BankAccountResponse> }) => (
        <DataTableColumnHeader
          column={column}
          label={t("models.bankAccount.fields.updatedAt")}
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
        const bankAccount = info.row.original;
        const bankAccountUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/bank-account/${bankAccount.id}`;
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
                  <Link href={`${bankAccountUrl}/view`}>
                    <Icon name="ScanEye" className="mr-2 h-4 w-4" />
                    {t("tables.columns.detail")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${bankAccountUrl}/edit`}>
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
            <DeleteBankAccountDialog
              onDelete={() => {
                handleDelete(bankAccount.id);
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
