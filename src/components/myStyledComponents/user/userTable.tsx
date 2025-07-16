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
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

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

  if (isLoading) {
    return (
     <div className="flex justify-center h-[85vh]">
        <span className="text-lg text-gray-600 dark:text-gray-300">
          Сторінка оновлюється ...
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex overflow-y-auto overflow-x-auto max-h-[85vh] pb-4">
      <table className="w-full text-sm mr-1 table-fixed">
        <thead className="bg-gray-200 sticky top-0 dark:bg-gray-300">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-1 border-white px-4 py-2 text-center font-semibold text-gray-700 dark:text-black"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center justify-between gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="even:bg-gray-50 hover:bg-gray-100 dark:even:bg-gray-800 dark:hover:bg-gray-700"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-4 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default UserTable;
