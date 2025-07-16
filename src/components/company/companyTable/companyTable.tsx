import { AppDispatch, RootState } from "@/store/store";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CompanyColumnsIct } from "./companyColumns";
import { Button } from "@/components/ui/button";
import {
  fetchCompany,
  selectCompanyFields,
  setSelectedCompany,
} from "@/store/companies/companies";
import { toggleCreateCompanyModal } from "@/store/modals/modalsSlice";
import { setActualLimit, setActualPage } from "@/store/companies/companies";
import EditCompany from "./editCompany";

export type CompanyTableProps = {
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const CompanyTableIct: React.FC<CompanyTableProps> = ({
  page,
  limit,
  setLimit,
  setPage,
}) => {
  const { company, totalPages } = useSelector(
    (state: RootState) => state.companies
  );
  const dispatch = useDispatch<AppDispatch>();

  const [inputValue, setInputValue] = useState(page);

  const table = useReactTable({
    data: company,
    columns: CompanyColumnsIct,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    dispatch(setActualLimit(limit));
    dispatch(setActualPage(page));
    dispatch(fetchCompany({ limit, page }));
  }, [dispatch, limit, page]);

  return (
    <div className="p-2">
      <EditCompany />
      <div>
        <table className="w-full text-sm mr-1 table-fixed">
          <thead className="bg-gray-200 sticky top-0 dark:bg-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`border-1 border-white px-4 py-2 text-center font-semibold text-gray-700 dark:text-black ${
                      header.id === "country" && "w-[80px]"
                    } ${header.id === "is_active" && "w-[80px]"} ${
                      header.id === "id" && "w-[120px]"
                    }`}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center justify-between gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="even:bg-gray-50 hover:bg-gray-100 dark:even:bg-gray-800 dark:hover:bg-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`border px-4 py-1 ${
                      cell.column.id === "company_name"
                        ? "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-500"
                        : ""
                    }`}
                    onClick={() => {
                      if (cell.column.id === "company_name") {
                        dispatch(setSelectedCompany(row.original));
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <div
          className="m-2 border-1 border-green-400 p-1 rounded-sm w-40 flex cursor-pointer"
          onClick={() => {
            dispatch(toggleCreateCompanyModal());
            dispatch(selectCompanyFields());
          }}
        >
          Створити компанію
        </div>
      </div>
      <div className="fixed bottom-0 mx-auto">
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
    </div>
  );
};

export default CompanyTableIct;
