import { Table, Updater } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  const currentPageIndex = table.getState().pagination.pageIndex;

  const visiblePageNumbers = pageNumbers.filter((number) => {
    return (
      number === 1 ||
      number === pageCount ||
      (number >= currentPageIndex &&
        number <= currentPageIndex + 5 &&
        pageCount > 5) ||
      (number <= currentPageIndex + 1 &&
        number >= currentPageIndex - 3 &&
        pageCount <= 5)
    );
  });

  const goToPage = (pageIndex: Updater<number>) => {
    table.setPageIndex(pageIndex);
  };

  return (
    <div className="flex items-center justify-evenly px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Рядків на сторінці</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Сторінка {table.getState().pagination.pageIndex + 1} з{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>

          {visiblePageNumbers.map((pageNumber, index) => (
            <React.Fragment key={pageNumber}>
              {index > 0 &&
                visiblePageNumbers[index - 1] !== pageNumber - 1 && (
                  <span className="mx-1">...</span>
                )}
              <Button
                variant={
                  currentPageIndex + 1 === pageNumber ? "default" : "outline"
                }
                className="h-8 w-8 p-0"
                onClick={() => goToPage(pageNumber - 1)}
              >
                {pageNumber}
              </Button>
            </React.Fragment>
          ))}

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
