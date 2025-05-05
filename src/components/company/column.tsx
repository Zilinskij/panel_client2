"use client";

import { Button } from "@/components/ui/button";
import { Company } from "@/types/companyTypes";
import { ColumnDef } from "@tanstack/react-table";
import { OctagonX, PencilLine } from "lucide-react";

export default function getColumns(
  onEdit: (company: Company) => void,
  onDelete: (id: number) => void,
): ColumnDef<Company>[] {
  return [
    {
      id: "index",
      header: "№",
      cell: ({ row }) => row.index + 1,
    },
    { accessorKey: "imjakompanii", header: "Name" },
    {
      accessorKey: "kodkompanii",
      header: "Kod",
    },
    {
      accessorKey: "dyrector",
      header: "Dyrector",
    },
    {
      accessorKey: "stvorena",
      header: "Foundation",
    },
    {
      accessorKey: "nomertel",
      header: "Tel.",
    },
    {
      accessorKey: "adresa",
      header: "Adress",
    },
    {
      accessorKey: "kilkprac",
      header: "Employees",
    },
    {
      accessorKey: "kilkavto",
      header: "Avto",
    },
    {
      accessorKey: "kilkprychepiv",
      header: "Trailers",
    },
    {
      accessorKey: "strahfirm",
      header: "Insurance",
    },
    {
      id: "actions",
      header: "Дії",
      cell: ({ row }) => {
        const company = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onEdit(company)}
              className="border-yellow-400"
            >
              <PencilLine className="w-4 h-4" />
              Редагувати
            </Button>
            <Button
              variant="outline"
              onClick={() => onDelete(company.id)}
              className="border-red-400"
            >
              <OctagonX className="w-2 h-4" />
              Видалити
            </Button>
          </div>
        )
      },
    },
  ];
}
