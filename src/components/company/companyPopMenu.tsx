"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

type Props = {
  limit: number;
  setLimit: (value: number) => void;
};

export function PopoverMenu({ limit, setLimit }: Props) {
  const limitRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    const newLimit = Number(limitRef.current?.value);
    setLimit(newLimit);
    setOpen(false);
    console.log("Limit: ", newLimit);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Фільтр таблиці</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Значення</h4>
            <p className="text-sm text-muted-foreground">
              Виберіть параметри для відображення
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">К-сть результатів</Label>
              <Input
                id="width"
                defaultValue={limit}
                ref={limitRef}
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <Button
            variant="outline"
            className="border-amber-300"
            onClick={handleSubmit}
          >
            Показати
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
