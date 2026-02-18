import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { renderElements } from "@/utils";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type DataTablePaginationProps<TData> = React.ComponentProps<"div"> & {
  table: Table<TData>;
  pageSizeOptions?: number[];
};

export const DataTablePagination = <TData,>({
  table,
  pageSizeOptions = [15, 30, 50, 100, 150, 200, 250],
  className,
  ...props
}: DataTablePaginationProps<TData>) => {
  const { t } = useTranslation();
  // const total = table.getRowCount();
  // const limit = table.getState().pagination.pageSize;
  // const currentPage = table.getState().pagination.pageIndex + 1;

  // const totalPages = Math.ceil(total / limit);

  // if (totalPages <= 1) return null;

  // const pages: number[] = [];

  // for (let i = 1; i <= totalPages; i++) {
  //   if (
  //     i === 1 ||
  //     i === totalPages ||
  //     (i >= currentPage - 2 && i <= currentPage + 2)
  //   ) {
  //     pages.push(i);
  //   }
  // }

  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground flex-1 text-sm whitespace-nowrap">
        {t("tables.footers.selectedRows", {
          selectCount: table.getFilteredSelectedRowModel().rows.length,
          rowCount: table.getFilteredRowModel().rows.length,
        })}
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium whitespace-nowrap">
            {t("tables.footers.rowsPerPage")}
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-20 data-size:h-8">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent
              side="top"
              position="popper"
              sideOffset={1}
              align="start"
            >
              {renderElements({
                of: pageSizeOptions,
                keyExtractor: (pageSize) => pageSize,
                render: (pageSize) => {
                  return (
                    <SelectItem value={`${pageSize}`}>{pageSize}</SelectItem>
                  );
                },
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          {t("tables.footers.page", {
            pageCount: table.getState().pagination.pageIndex + 1,
            pageTotal: table.getPageCount(),
          })}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          {/* <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    !table.getCanPreviousPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  onClick={() => table.previousPage()}
                />
              </PaginationItem>

              {renderElements({
                of: pages,
                keyExtractor: (page) => page,
                render: (page, index) => {
                  if (index > 0 && pages[index - 1] !== page - 1) {
                    return (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => table.setPageIndex(page - 1)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                },
              })}

              <PaginationItem>
                <PaginationNext
                  className={
                    !table.getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  onClick={() => table.nextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
