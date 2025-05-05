"use client";

import {
  Client,
  fetchClients,
  setSelectedClient,
} from "@/store/company/companyEdit";
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
  ColumnDef,
  flexRender,
  ColumnOrderState,
} from "@tanstack/react-table";
import React from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ClipboardPenLine } from "lucide-react";

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
  const dispatch = useDispatch<AppDispatch>();
  const { clients, status, error, totalPages } = useSelector(
    (state: RootState) => state.companyClients
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowSelection, _setRowSelection] = React.useState({});
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(page);

  const columns: ColumnDef<Client>[] = [
    {
      header: "Оновна інформація",
      columns: [
        { accessorKey: "kod", header: "kod" },
        {
          id: "edit",
          header: () => {
            return <div className="">EDIT</div>;
          },
          cell: ({ row }) => {
            const client = row.original;
            return (
              <div className="">
                <Button
                  variant="outline"
                  onClick={() => {
                    dispatch(setSelectedClient(client));
                  }}
                  className="border-green-300"
                >
                  <ClipboardPenLine className="h-3 w-3" />
                </Button>
              </div>
            );
          },
        },
        { accessorKey: "nurdokl", header: "Мала назва підприємства" },
        { accessorKey: "nurdoklfix", header: "Фіксована скорочена назва" },
        { accessorKey: "nur", header: "Назва скорочена" },
        { accessorKey: "adrpunkt", header: "Нас.пункт" },
        { accessorKey: "adrvul", header: "Вулиця" },
        { accessorKey: "director", header: "Керівник" },
      ],
    },
    {
      header: "Типи участі",
      columns: [
        {
          accessorKey: "isclient",
          header: "Як клієнт",
          cell: ({ row }) => {
            const value = row.getValue("isclint");
            return (
              <Checkbox
                checked={!!value}
                disabled
                className="pointer-events-none"
              />
            );
          },
        },
        {
          accessorKey: "ispostach",
          header: "Як постачальник",
          cell: ({ row }) => {
            const value = row.getValue("ispostach");
            return (
              <Checkbox
                checked={!!value}
                disabled
                className="pointer-events-none"
              />
            );
          },
        },
        { accessorKey: "iselse", header: "Як інший" },
        { accessorKey: "isexp", header: "Як експедиція" },
      ],
    },
    {
      header: "Додатково",
      columns: [
        { accessorKey: "permn", header: "Перевезення міжміські" },
        { accessorKey: "pernegabarit", header: "Возить негабарит" },
      ],
    },
  ];

  const table = useReactTable({
    data: clients,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
        <Button variant="outline" onClick={() => setOpen(!open)}>
          {open ? "Приховати" : "Фільтрувати"}
        </Button>
        <div>
          {status === "success" && clients.length > 0 && (
            <>
              <div className="flex overflow-y-auto overflow-x-auto max-h-[85vh] pb-4">
                {open && (
                  <div className="px-4 border border-gray-300 flex-col ">
                    <label>
                      <input
                        {...{
                          type: "checkbox",
                          checked: table.getIsAllColumnsVisible(),
                          onChange:
                            table.getToggleAllColumnsVisibilityHandler(),
                        }}
                      />{" "}
                      Toggle All
                    </label>
                    {table.getAllLeafColumns().map((column) => {
                      return (
                        <div key={column.id} className="px-1">
                          <label>
                            <input
                              {...{
                                type: "checkbox",
                                checked: column.getIsVisible(),
                                onChange: column.getToggleVisibilityHandler(),
                              }}
                            />{" "}
                            {column.id}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}

                <Table className="min-w-[800px]">
                  <TableHeader className="bg-gray-100 sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            colSpan={header.colSpan}
                            className="text-center border-1"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
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
