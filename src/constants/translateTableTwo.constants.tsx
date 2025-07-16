/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  toggleDeleteValueModal,
  toggleUpdateTranslateModal,
} from "@/store/modals/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { takeAllFields } from "@/store/translate/translateSlice";
import { TranslateTableData } from "@/types/translateTable";
import { createColumnHelper } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export const ColumnsRowTwo = () => {
  const columnHelper = createColumnHelper<TranslateTableData>();
  const dispatch = useDispatch<AppDispatch>();

  return [
    columnHelper.accessor("ids", {
      header: "Код",
      cell: ({ row }) => row.original.ids,      
    }),
    columnHelper.accessor("expr", {
      header: "Значення",
      cell: ({ row }) => {
        const keystrValue = useSelector(
          (state: RootState) => state.translate.keystr
        );
        const selectedTbl = useSelector(
          (state: RootState) => state.translate.selectedTbl
        );
        
        const langUk = row.original.ids === "uk";
        const handleDelete = async () => {
          const result = await dispatch(takeAllFields(keystrValue));
          if (takeAllFields.fulfilled.match(result)) {
            dispatch(toggleDeleteValueModal());
          } else {
            console.error("Помилка при отриманні значень полів");
          }
        };

        return (
          <div className="flex justify-between w-full">
            <span>{row.original.expr}</span>
            <div className="flex gap-2">
              <div className="flex">
                <PencilLine
                  className={
                    !langUk || selectedTbl === "appterm"
                      ? "h-5 w-8 p-1 text-green-600 cursor-pointer border-1 hover:border-green-200 rounded-xl hover:bg-gray-300 hover:text-green-200"
                      : "hidden"
                  }
                  onClick={() => dispatch(toggleUpdateTranslateModal())}
                />
              </div>
              <div
                className="flex justify-end"
                onClick={() => {
                  handleDelete();
                }}
              >
                <Trash2
                  className={
                    !langUk || selectedTbl === "appterm"
                      ? "h-5 w-8 p-1 text-red-600 cursor-pointer border-1 border-gray-200 rounded-xl hover:bg-gray-300 hover:border-red-200 hover:text-red-400"
                      : "hidden"
                  }
                />
              </div>
            </div>
          </div>
        );
      },
    }),
  ];
};
