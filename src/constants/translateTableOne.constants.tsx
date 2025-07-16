"use client";

import { DropDounTbl } from "@/components/translate/dropdownTbl";
import { toggleCreateModal } from "@/store/modals/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { TranslateTableData } from "@/types/translateTable";
import { createColumnHelper } from "@tanstack/react-table";
import { ClipboardPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export const ColumnsRow = () => {
  const columnHelper = createColumnHelper<TranslateTableData>();
  const dispatch = useDispatch<AppDispatch>();
  const tblData = useSelector(
    (state: RootState) => state.translate.allFieldsTbl
  );
  const selectedTbl = useSelector(
    (state: RootState) => state.translate.selectedTbl
  );
  const selectName = tblData.find((e) => e.tbl === selectedTbl)?.name;

  return [
    columnHelper.accessor("kilperekl", {
      header: () => <div className="flex text-center">К-сть</div>,
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
    }),
    columnHelper.accessor("keystr", {
      header: ({}) => (
        <>
          <div className="flex flex-col">
            <div
              className="flex justify-between items-center
           gap-2 w-full"
            >
              <span className="flex">Ключ</span>
            </div>
            <div className="flex justify-between gap-4 my-2">
              <DropDounTbl />
              {selectName === "Інтерфейс" && (
                <button
                  className="cursor-pointer text-green-600"
                  onClick={() => dispatch(toggleCreateModal())}
                >
                  <ClipboardPlus />
                </button>
              )}
            </div>
          </div>
        </>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-between w-full">
            <span>{row.original.keystr}</span>
          </div>
        );
      },
      enableColumnFilter: true,
    }),
    columnHelper.accessor("expr", {
      header: () => (
        <div>
          <div>Значення</div>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-between w-full text-left">
            <span>{row.original.expr}</span>
          </div>
        );
      },
      enableColumnFilter: false,
    }),
  ];
};
