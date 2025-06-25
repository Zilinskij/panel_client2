"use client";

import { DropDounTbl } from "@/components/translate/dropdownTbl";
import { TranslateTableData } from "@/types/translateTable";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<TranslateTableData>();

export const ColumnsRow = () => {

  return [
    columnHelper.accessor("kilperekl", {
      header: () => <div className="flex text-center">К-сть</div>,
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
    }),
    columnHelper.accessor("keystr", {
      header: () => (
        <>
          <div className="flex justify-between">
            <span className="flex">Ключ</span>
          </div>
          <DropDounTbl />
        </>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-between items-center w-full">
            <span>{row.original.keystr}</span>
          </div>
        );
      },
      enableColumnFilter: true,
    }),
  ];
};
