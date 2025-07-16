import { CompanyTable } from "@/types/companyTypes";
import { ColumnDef } from "@tanstack/react-table";


export const CompanyColumnsIct: ColumnDef<CompanyTable>[] = [
  {
     accessorKey: "company_name",
    header: "Назва компанії",
  },
 
  {
    accessorKey: "locality",
    header: "Населений пункт",
  },
  {
    accessorKey: "edrpou",
    header: "ЄДРПОУ",
  },
  {
    accessorKey: "country",
    header: "Країна",
  },
  {
    accessorKey: "dt_reestr",
    header: "Дата реєстрації",
  },
  {
    accessorKey: "is_active",
    header: "Активна",
    cell: ({ getValue }) => (getValue() ? "Так" : "Ні"),
  },
  {
    accessorKey: "dt_blocked",
    header: "Дата блокування",
  },
  {
    accessorKey: "dt_deleted",
    header: "Дата видалення",
  },
];
