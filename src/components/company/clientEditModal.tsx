"use client";

import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { clearSelectedClient, editClients } from "@/store/company/companyEdit";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { ClientsIst } from "@/types/companyClients";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { initialClient } from "./initialClient";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";

const ClientEditModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const client = useSelector(
    (state: RootState) => state.companyClients.selectedClient
  );

  const [valueClient, setValueClient] = useState<ClientsIst>(initialClient);

  useEffect(() => {
    if (client) {
      setValueClient(client);
      dispatch(editClients(client));
    }
  }, [client]);

  if (!client && !valueClient) return null;

  return (
    <Sheet open={!!client} onOpenChange={() => dispatch(clearSelectedClient())}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Редагувати дані</SheetTitle>
          <SheetDescription>
            Внеси зміни в відповідні дані. Натисни `Зберегти` коли завершиш.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[80vh] py-4 px-2">
          {Object.entries(valueClient).map(([key, value]) => (
            <div key={key} className="grid items-center gap-4 py-1">
              <Label htmlFor={key} className="capitalize">
                {key}
              </Label>
              {typeof value === "boolean" ? (
                <Checkbox
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => {
                    setValueClient({
                      ...valueClient,
                      [key]: !!checked,
                    });
                  }}
                />
              ) : (
                <Input
                  id={key}
                  value={value || ""}
                  onChange={(e) => {
                    setValueClient({
                      ...valueClient,
                      [key]: e.target.value,
                    });
                  }}
                  className="col-span-3"
                />
              )}
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              variant="outline"
              onClick={() => {
                dispatch(editClients(valueClient));
                dispatch(clearSelectedClient());
                toast.success("Зміни внесено успішно");
              }}
              className="border-green-400"
            >
              Зберегти
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ClientEditModal;
