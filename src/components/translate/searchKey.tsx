import { TranslateTableData } from "@/types/translateTable";
import { Column } from "@tanstack/react-table";
import { useEffect, useState } from "react";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(initialValue);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [initialValue, debounce]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Filter({ column }: { column: Column<TranslateTableData> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <div>
      <DebouncedInput
        className="w-25 text-sm px-2 py-1 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 top-0"
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Пошук...`}
        type="text"
        value={(columnFilterValue ?? "") as string}
        debounce={300}
      />
    </div>
  );
}
