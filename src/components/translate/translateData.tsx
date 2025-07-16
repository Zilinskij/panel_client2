"use client";

import { ColumnsRow } from "@/constants/translateTableOne.constants";
import { AppDispatch, RootState } from "@/store/store";
import {
  translateByKey,
  Translate,
  serverFilterByKey,
  setKeystr,
  selectTblFieldsAll,
  translateByKeyTbl,
  setExpr,
} from "@/store/translate/translateSlice";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "./searchKey";

export default function TranslateData() {
  const dispatch = useDispatch<AppDispatch>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const translData: Translate[] =
    useSelector((state: RootState) => state.translate.tableData) ?? [];

  const selectedKey = useSelector((state: RootState) => state.translate.keystr);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const tbl = useSelector((state: RootState) => state.translate.selectedTbl);
const firstKeystr = useSelector((state: RootState) => state.translate.firstKeystr)

  useEffect(() => {
    const exprData = translData.find((e) => e.keystr === selectedKey);
    if (exprData) {
      dispatch(setExpr(exprData.expr));
    }
  }, [selectedKey, translData, dispatch]);

  useEffect(() => {
    dispatch(translateByKeyTbl(tbl));
    dispatch(selectTblFieldsAll([]));
  }, [dispatch, tbl]);

  useEffect(() => {
    if (firstKeystr && tbl) {
      dispatch(translateByKey({ key: firstKeystr, tbl: tbl }));
    }
  }, [dispatch, firstKeystr, tbl]);

  useEffect(() => {
    if (selectedKey && tbl) {
      dispatch(translateByKey({ key: selectedKey, tbl: tbl }));
    }
  }, [selectedKey, dispatch, tbl]);

  const filtersWithValue = useMemo(
    () => columnFilters.filter((e) => e.value),
    [columnFilters]
  );

  useEffect(() => {
    if (filtersWithValue.length === 0) {
      dispatch(translateByKeyTbl(tbl));
    } else {
      dispatch(serverFilterByKey({ filters: columnFilters[0], tbl: tbl }));
    }
  }, [filtersWithValue, dispatch, columnFilters, tbl]);

  const table = useReactTable({
    data: translData,
    columns: ColumnsRow(),
    filterFns: {},
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: true,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="">
      <table className="w-full text-sm mr-1 table-fixed">
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
                  {header.isPlaceholder ? null : (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                      <div>
                        {header.column.getCanFilter() && (
                          <Filter column={header.column} />
                        )}
                      </div>
                    </>
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
              className="even:bg-gray-50 hover:bg-gray-100 dark:even:bg-gray-800 dark:hover:bg-gray-700 text-center"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`border px-4 py-1 ${
                    cell.column.id === "keystr"
                      ? "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-500"
                      : ""
                  }`}
                  onClick={() => {
                    if (cell.column.id === "keystr") {
                      const value = cell.getValue();
                      if (typeof value === "string") {
                        dispatch(setKeystr(value));
                      }
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
