"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { setTranslateValue } from "@/store/modals/modalsSlice";
import { ColumnsRowTwo } from "@/constants/translateTableTwo.constants";
import { setLang } from "@/store/translate/translateSlice";

export default function TranslateByKey() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredData = useSelector(
    (state: RootState) => state.translate.filteredTableData
  );
  
  const columns = ColumnsRowTwo();
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex">
      <table className="table-fixed w-full h-1 text-sm ml-1">
        <thead className="bg-gray-200 sticky top-0 dark:bg-gray-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <th
                  key={header.id}
                  className={`border-1 border-white  px-4 py-2 text-left font-semibold text-gray-700 dark:text-black ${
                    i === 0 ? "w-[70px]" : ""
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={row.id}
              className="even:bg-gray-50 hover:bg-gray-100 dark:even:bg-gray-800 dark:hover:bg-gray-700"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`border px-4 py-1 ${i === 0 ? "w-[80px]" : ""} ${
                    cell.column.id === "expr" ? "" : ""
                  } text-center`}
                  onClick={() => {
                    if (cell.column.id === "expr") {
                      dispatch(setTranslateValue(row.original));
                      dispatch(setLang(row.original.ids!));
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
  );
}
