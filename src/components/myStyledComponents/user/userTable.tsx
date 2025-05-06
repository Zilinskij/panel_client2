import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUsers } from "@/store/user/userSlice";
import { UserIst } from "@/types/user";
import {
  ColumnOrderState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const users: UserIst[] = useSelector((state: RootState) => state.user.users);
  console.log(users);

  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columnHelper = createColumnHelper<UserIst>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("surname", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.group({
      header: "Контакти",
      columns: [
        columnHelper.accessor("email", {
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("phone_num", {
          cell: (info) => info.getValue(),
        }),
      ],
    }),
    columnHelper.accessor("is_admin", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("is_active", {
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    columns,
    data: users,
    state: {
      columnVisibility,
      columnOrder,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table.getRowModel().rows, "-- ROWS");

  return (
    <>
    
      <h2 className="text-xl font-bold mb-4">Користувачі</h2>
      <div className="flex overflow-y-auto overflow-x-auto max-h-[85vh] pb-4">
      <div className="px-4 border border-gray-300 flex-col ">
        <label>
          <input
            {...{
              type: "checkbox",
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />{" "}
          Toggle All
        </label>
        {table.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                {column.id}
              </label>
            </div>
          );
        })}
      </div>
        <Table className="min-w-[800px]">
          <TableHeader className="bg-gray-100 sticky top-0 dark:bg-gray-600">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="text-center border-2"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UserTable;
