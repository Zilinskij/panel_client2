import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { initialCompany } from "@/constants/companyConst";
import { clearSelectedCompany } from "@/store/companyes/companyes";
import { AppDispatch, RootState } from "@/store/store";
import { CompanyTable } from "@/types/companyTypes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditCompany = () => {
const dispatch = useDispatch<AppDispatch>()
const company = useSelector((state: RootState) => state.companies.selectedCompany)
const [valueCompany, setValueCompany] = useState<CompanyTable>(initialCompany)

useEffect(() => {
    if (company) {
setValueCompany(company)
    }
}, [company])

  return (
    <div>
      <Sheet open={!!company} onOpenChange={() => dispatch(clearSelectedCompany())}>
        <SheetContent side='right'>
          <SheetHeader>
            <SheetTitle>Редагування</SheetTitle>
            <SheetDescription>
              Внеси зміни в відповідні дані. Натисни `Зберегти` коли завершиш.
            </SheetDescription>
          </SheetHeader>
           <div className="overflow-y-auto max-h-[80vh] py-4 px-2 flex flex-wrap flex-row">
          {Object.entries(valueCompany).map(([key, value]) => (
            <div key={key} className="grid items-center gap-2 py-1 w-full">
              <Label htmlFor={key} className="capitalize">
                {key}
              </Label>
              {typeof value === "boolean" ? (
                <Checkbox
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => {
                    setValueCompany({
                      ...valueCompany,
                      [key]: !!checked,
                    });
                  }}
                />
              ) : (
                <Input
                  id={key}
                  value={value || ""}
                  onChange={(e) => {
                    setValueCompany({
                      ...valueCompany,
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
            <Button type="submit">Зберегти зміни</Button>
            <SheetClose asChild>
              <Button variant="outline">Закрити</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditCompany;
