"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import { Check, Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { renderElements } from "@/utils";

type DataTableViewOptionsProps<TData> = React.ComponentProps<
  typeof PopoverContent
> & {
  table: Table<TData>;
  disabled?: boolean;
};

export const DataTableViewOptions = <TData,>({
  table,
  disabled,
  ...props
}: DataTableViewOptionsProps<TData>) => {
  const { t } = useTranslation();
  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide(),
        ),
    [table],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Toggle columns"
          role="combobox"
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 font-normal lg:flex"
          disabled={disabled}
        >
          <Settings2 className="text-muted-foreground" />
          {t("tables.toolbar.view")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-0" {...props}>
        <Command>
          <CommandInput placeholder={`${t("tables.toolbar.searchView")}...`} />
          <CommandList>
            <CommandEmpty>{t("tables.toolbar.viewNotFound")}.</CommandEmpty>
            <CommandGroup>
              {renderElements({
                of: columns,
                keyExtractor: (column) => column.id,
                render: (column) => {
                  return (
                    <CommandItem
                      onSelect={() =>
                        column.toggleVisibility(!column.getIsVisible())
                      }
                    >
                      <span className="truncate capitalize">
                        {column.columnDef.meta?.label ?? column.id}
                      </span>
                      <Check
                        className={cn(
                          "ml-auto size-4 shrink-0",
                          column.getIsVisible() ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                },
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
