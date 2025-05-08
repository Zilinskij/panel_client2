"use client";

import { Input } from "@/components/ui/input";

type CompanyTableFilterProps = {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
};

const CompanyTableFilter: React.FC<CompanyTableFilterProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <div className="my-2">
      <Input
        type="text"
        placeholder="Фільтрувати..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

export default CompanyTableFilter;
