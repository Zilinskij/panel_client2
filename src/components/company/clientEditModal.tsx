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

const ClientEditModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const client = useSelector(
    (state: RootState) => state.companyClients.selectedClient
  );

  const [valueClient, setValueClient] = useState<ClientsIst>(initialClient);
  const originalType = typeof valueClient;

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
            <>
              <br />
              <div className="grid items-center gap-4 py-1">
                {originalType === "boolean" ? (
                  <div className="flex items-center gap-2">
                    <Label className="cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value === true}
                        onChange={(e) => {
                          setValueClient({
                            ...valueClient,
                            [key]: e.target.checked,
                          });
                        }}
                      />
                      <span className="ml-2">Так / Ні</span>
                    </Label>
                  </div>
                ) : (
                  <Input
                    id={key}
                    value={value || ""}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const parsedValue =
                        originalType === "number"
                          ? Number(inputValue)
                          : inputValue;
                      setValueClient({
                        ...valueClient,
                        [key]: parsedValue,
                      });
                    }}
                    className="col-span-3"
                  />
                )}
              </div>
            </>
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
              }}
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
