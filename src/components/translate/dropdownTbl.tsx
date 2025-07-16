"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setFirstKeystr,
  setSelectedTbl,
  translateByKeyTbl,
} from "@/store/translate/translateSlice";
import { useEffect } from "react";

export function DropDounTbl() {
  const tblData = useSelector(
    (state: RootState) => state.translate.allFieldsTbl
  );

  const selectedTbl = useSelector(
    (state: RootState) => state.translate.selectedTbl
  );
  const dispatch = useDispatch<AppDispatch>();

  const selectName = tblData.find((e) => e.tbl === selectedTbl)?.name;
  const tableDataFirst = useSelector(
    (state: RootState) => state.translate.tableDataFirst
  );

  useEffect(() => {
    if (tableDataFirst?.keystr) {
      dispatch(setFirstKeystr(tableDataFirst.keystr));
    }
  }, [dispatch, tableDataFirst]);

  return (
    <Select
      onValueChange={(e) => {
        dispatch(setSelectedTbl(e));
        dispatch(translateByKeyTbl(e));
      }}
    >
      <SelectTrigger className="w-[100%] cursor-pointer">
        <SelectValue />
        {selectName || "Оберіть таблицю"}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tables:</SelectLabel>
          {tblData.map((item: { tbl: string; name: string }) => (
            <SelectItem key={item.tbl} value={item.tbl}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
