"use client";
import { Column } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import ColumnFilterModal from "./columnFilterModal";

type Props<TData> = {
  column: Column<TData, unknown>;
};

export default function ColumnFilterButton<TData>({ column }: Props<TData>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <span className="text-gray-200 text-xl">|</span>
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="p-1 h-6 w-6 cursor-pointer z-20 relative"
          data-filter-button
        >
          <Filter className="w-4 h-4" />
        </Button>

        <ColumnFilterModal
          column={column}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  );
}
