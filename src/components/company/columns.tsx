import { Client, setSelectedClient } from "@/store/company/companyEdit";
import { ColumnDef } from "@tanstack/react-table";
import ColumnFilterButton from "../myStyledComponents/columnFilterButton";
import { Button } from "../ui/button";
import { ClipboardPenLine } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { AppDispatch } from "@/store/store";
import { CustomColumnMeta } from "@/types/companyTypes";

export const ClientsСolumns = (
  dispatch: AppDispatch
): ColumnDef<Client, CustomColumnMeta>[] => [
  {
    header: "Оновна інформація",
    columns: [
      {
        accessorKey: "kod",
        header: ({ column }) => (
          <div className="flex items-center gap-2 z-50 relative">
            Код
            <ColumnFilterButton column={column} />
          </div>
        ),
        meta: {
          headerLabel: "Код",
        },
      },
      {
        id: "edit",
        header: () => {
          return <div className="cursor-default">EDIT</div>;
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
                className="border-green-300 cursor-pointer"
              >
                <ClipboardPenLine className="h-3 w-3" />
              </Button>
            </div>
          );
        },
      },
      {
        accessorKey: "nurdokl",
        header: ({ column }) => (
          <div className="flex items-center gap-2 z-50 relative">
            Мала назва підприємства
            <ColumnFilterButton column={column} />
          </div>
        ),
        meta: {
          headerLabel: "Мала назва підприємства",
        },
      },
      {
        accessorKey: "nurdoklfix",
        header: ({ column }) => (
          <div className="flex items-center gap-2 z-50 relative">
            Фіксована скорочена назва
            <ColumnFilterButton column={column} />
          </div>
        ),
        meta: {
          headerLabel: "Фіксована скорочена зазва",
        },
      },
      {
        accessorKey: "nur",
        header: ({ column }) => (
          <div className="flex items-center gap-2 z-50 relative">
            Назва скорочена
            <ColumnFilterButton column={column} />
          </div>
        ),
        meta: {
          headerLabel: "Назва скорочена",
        },
      },
      {
        accessorKey: "adrpunkt",
        header: ({ column }) => (
          <div className="flex items-center gap-2 z-50 relative">
            Населений пункт
            <ColumnFilterButton column={column} />
          </div>
        ),
        meta: {
          headerLabel: "Населений пункт",
        },
      },
      {
        accessorKey: "adrvul",
        header: ({ column }) => (
          <div className="flex items-center gap-2 z-50 relative">
            Вулиця
            <ColumnFilterButton column={column} />
          </div>
        ),
        meta: {
          headerLabel: "Вулиця",
        },
      },
      {
        accessorKey: "director",
        header: ({ column }) => (
          <div className="flex items-center gap-2 z-50 relative">
            Керівник
            <ColumnFilterButton column={column} />
          </div>
        ),
        meta: {
          headerLabel: "Керівник",
        },
      },
    ],
  },
  {
    header: "Типи участі",
    columns: [
      {
        accessorKey: "isclient",
        header: "Як клієнт",
        cell: ({ row }) => {
          const value = row.getValue("isclient");
          return (
            <Checkbox
              checked={!!value}
              disabled
              className="pointer-events-none"
            />
          );
        },
        meta: {
          headerLabel: "Як клієнт",
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
        meta: {
          headerLabel: "Як постачальник",
        },
      },
      {
        accessorKey: "iselse",
        header: "Як інший",
        meta: {
          headerLabel: "Як інший",
        },
      },
      {
        accessorKey: "isexp",
        header: "Як експедиція",
        meta: {
          headerLabel: "Як експедиція",
        },
      },
    ],
  },
  {
    header: "Додатково",
    columns: [
      {
        accessorKey: "permn",
        header: "Перевезення міжміські",
        meta: {
          headerLabel: "Перевезення міжміські",
        },
      },
      {
        accessorKey: "pernegabarit",
        header: "Возить негабарит",
        meta: {
          headerLabel: "Возить негабарит",
        },
      },
    ],
  },
];
