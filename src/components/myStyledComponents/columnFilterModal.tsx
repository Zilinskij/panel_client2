"use client";
import { Column } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Props<TData> = {
  column: Column<TData, unknown>;
  open: boolean;
  onClose: () => void;
};

export default function ColumnFilterModal<TData>({
  column,
  open,
  onClose,
}: Props<TData>) {
  const columnId = column.columnDef.meta?.headerLabel ?? column.id;
  const filterValue = (column.getFilterValue() as string) ?? "";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogHeader>
          <DialogTitle>Фільтр для: {columnId}</DialogTitle>
        </DialogHeader>
        <Input
          defaultValue={filterValue}
          placeholder={`Пошук у полі "${
            column.columnDef.meta?.headerLabel || columnId
          }"`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const input = e.target as HTMLInputElement;
              column.setFilterValue(input.value);
              onClose();
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
