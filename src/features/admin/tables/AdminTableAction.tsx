import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
  ActionBarSeparator,
} from "@/components/ui/action-bar";
import { Icon } from "@/components/ui/icon";
import { exportTableToCSV } from "@/lib/export";
import type { Table } from "@tanstack/react-table";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteAdminDialog } from "../components";
import { useDeleteManyAdmins } from "../hooks";
import type { AdminResponse } from "../types";

type AdminTableActionBarProps = {
  table: Table<AdminResponse>;
};

export const AdminTableActionBar = ({ table }: AdminTableActionBarProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wasPendingRef = useRef(false);
  const rows = table.getFilteredSelectedRowModel().rows;
  const { onDelete, isPending } = useDeleteManyAdmins();

  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      table.toggleAllRowsSelected(false);
      setIsOpen(false);
    }
    wasPendingRef.current = isPending;
  }, [isPending, table]);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        table.toggleAllRowsSelected(false);
      }
    },
    [table],
  );

  const handleExport = useCallback(() => {
    exportTableToCSV(table, {
      excludeColumns: ["select", "actions"],
      onlySelected: true,
    });
  }, [table]);

  const handleDelete = useCallback(() => {
    const selectedIds = rows.map((row) => row.original.id);
    onDelete({ ids: selectedIds });
  }, [rows, table]);

  return (
    <ActionBar open={rows.length > 0} onOpenChange={onOpenChange}>
      <ActionBarSelection>
        <span className="font-medium">{rows.length}</span>
        <span>{t("tables.actions.selected")}</span>
        <ActionBarSeparator />
        <ActionBarClose>
          <Icon name="X" />
        </ActionBarClose>
      </ActionBarSelection>
      <ActionBarSeparator />
      <ActionBarGroup>
        <ActionBarItem onClick={handleExport}>
          <Icon name="Download" />
          {t("tables.actions.export")}
        </ActionBarItem>
        <ActionBarItem
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <Icon name="Trash2" />
          {t("tables.actions.delete")}
        </ActionBarItem>
        <DeleteAdminDialog
          onDelete={handleDelete}
          isPending={isPending}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </ActionBarGroup>
    </ActionBar>
  );
};
