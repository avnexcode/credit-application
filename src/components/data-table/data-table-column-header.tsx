"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Icon } from "../ui/icon";

type DataTableColumnHeaderProps<TData, TValue> = React.ComponentProps<
  typeof DropdownMenuTrigger
> & {
  column: Column<TData, TValue>;
  label: string;
};

export const DataTableColumnHeader = <TData, TValue>({
  column,
  label,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const { t } = useTranslation();

  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{label}</div>;
  }

  const isSorted = column.getIsSorted();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "hover:bg-accent focus:ring-ring data-[state=open]:bg-accent [&_svg]:text-muted-foreground -ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 focus:ring-1 focus:outline-none [&_svg]:size-4 [&_svg]:shrink-0",
          className,
        )}
        {...props}
      >
        {label}
        {column.getCanSort() &&
          (isSorted === "desc" ? (
            <Icon name="ChevronDown" />
          ) : isSorted === "asc" ? (
            <Icon name="ChevronUp" />
          ) : (
            <Icon name="ChevronsUpDown" />
          ))}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-28">
        {column.getCanSort() && (
          <>
            <DropdownMenuCheckboxItem
              className="[&_svg]:text-muted-foreground relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
              checked={isSorted === "asc"}
              onClick={() => column.toggleSorting(false)}
            >
              <Icon name="ChevronUp" />
              {t("tables.headers.ascending")}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="[&_svg]:text-muted-foreground relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
              checked={isSorted === "desc"}
              onClick={() => column.toggleSorting(true)}
            >
              <Icon name="ChevronDown" />
              {t("tables.headers.descending")}
            </DropdownMenuCheckboxItem>
            {isSorted && (
              <DropdownMenuItem
                className="[&_svg]:text-muted-foreground pl-2"
                onClick={() => column.clearSorting()}
              >
                <Icon name="X" />
                {t("tables.headers.reset")}
              </DropdownMenuItem>
            )}
          </>
        )}
        {column.getCanHide() && (
          <DropdownMenuCheckboxItem
            className="[&_svg]:text-muted-foreground relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto"
            checked={!column.getIsVisible()}
            onClick={() => column.toggleVisibility(false)}
          >
            <Icon name="EyeOff" />
            {t("tables.headers.hide")}
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
