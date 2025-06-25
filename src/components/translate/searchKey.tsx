import { TranslateTableData } from "@/types/translateTable";
import { Column } from "@tanstack/react-table";
import { useEffect, useState } from "react";

function DebouncedInput({
  value: initialValue,
  onChange,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

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
        className="w-20 sm:w-36 border shadow rounded bg-gray-100 px-2"
        onChange={(value) => column.setFilterValue(value)}        
        placeholder={`Пошук...`}
        type="text"
        value={(columnFilterValue ?? "") as string}
      />
    </div>
  );
}
