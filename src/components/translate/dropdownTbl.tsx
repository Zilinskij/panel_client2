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
  setSelectedTbl,
  translateByKeyTbl,
} from "@/store/translate/translateSlice";

export function DropDounTbl() {
  const tblData = useSelector(
    (state: RootState) => state.translate.allFieldsTbl
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Select
      onValueChange={(e) => {
        dispatch(setSelectedTbl(e));
        dispatch(translateByKeyTbl(e));
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="TBL" />
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
