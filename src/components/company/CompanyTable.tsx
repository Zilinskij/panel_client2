"use client";

import { fetchClients } from "@/store/company/companyEdit";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientEditModal from "./clientEditModal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnOrderState,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import React from "react";
import { Button } from "../ui/button";
import { ArrowBigDownDash, ArrowBigUpDash, ChevronDown } from "lucide-react";
import { useClientSocket } from "@/hooks/useClientsSocket";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ClientsСolumns } from "./columns";

type CompanyTableProps = {
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const CompanyTable: React.FC<CompanyTableProps> = ({
  page,
  limit,
  setPage,
  setLimit,
}) => {
  useClientSocket();
  const dispatch = useDispatch<AppDispatch>();
  const { clients, status, error, totalPages } = useSelector(
    (state: RootState) => state.companyClients
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowSelection, _setRowSelection] = React.useState({});
  // const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(page);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const columns = ClientsСolumns(dispatch);

  const table = useReactTable({
    data: clients,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      rowSelection,
      sorting,
      globalFilter,
    },
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    columnResizeMode: "onChange",
    manualPagination: true,
    pageCount: totalPages,
  });

  useEffect(() => {
    dispatch(fetchClients({ limit, page }));
    console.log(page);
    console.log(totalPages, "- totalpages companytable");
  }, [dispatch, limit, page]);

  return (
    <div>
      <>
        <ClientEditModal />
        {status === "loading" && <p>Завантаження...</p>}
        {status === "failed" && <p>Помилка: {error}</p>}

        <div>
          {status === "success" && clients.length > 0 && (
            <>
              <DropdownMenu>
                <div className="flex justify-end">
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="mr-4 border-amber-400">
                      Вибрати колонки <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent align="end">
                  {table
                    .getAllLeafColumns()
                    .filter((column) => column.getCanHide())
                    .filter((_, index) => index !== 1)
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.columnDef.meta?.headerLabel?.toString() ||
                            column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex overflow-y-auto overflow-x-auto max-h-[85vh] pb-4">
                <div className="flex">
                  <Table>
                    <TableHeader className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              colSpan={header.colSpan}
                              className="text-center border-2"
                            >
                              <div className="flex items-center justify-center">
                                {header.isPlaceholder ? null : (
                                  <div className="flex items-center gap-1">
                                    <div
                                      onClick={(e) => {
                                        if (
                                          !(e.target as HTMLElement).closest(
                                            "[data-filter-button]"
                                          )
                                        ) {
                                          header.column.toggleSorting();
                                        }
                                      }}
                                      className="cursor-pointer flex items-center gap-1"
                                    >
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                      {{
                                        asc: <ArrowBigUpDash />,
                                        desc: <ArrowBigDownDash />,
                                      }[
                                        header.column.getIsSorted() as string
                                      ] ?? null}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="">
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-1">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex sticky bottom-0 justify-center">
          <div className="h-2" />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border rounded p-1"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              {"<<"}
            </Button>
            <Button
              variant="outline"
              className="border rounded p-1"
              onClick={() => setPage((p: number) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              {"<"}
            </Button>
            <Button
              variant="outline"
              className="border rounded p-1"
              onClick={() => setPage((p: number) => p + 1)}
              disabled={page === totalPages}
            >
              {">"}
            </Button>
            <Button
              variant="outline"
              className="border rounded p-1"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              {">>"}
            </Button>
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <div>Сторінка:</div>
              <strong>
                {page} з {totalPages}
              </strong>
            </span>

            <span className="flex items-center gap-1">
              | Відкрити сторінку:
              <input
                type="number"
                min="1"
                max={totalPages}
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (inputValue >= 1 && inputValue <= totalPages) {
                      setPage(inputValue);
                    }
                  }
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Показати {pageSize} рядків
                </option>
              ))}
            </select>
          </div>
          <br />
        </div>
      </>
    </div>
  );
};

export default CompanyTable;
