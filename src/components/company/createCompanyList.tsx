import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { companyProductSchema } from "@/validations/company/company.validations";
import instance from "@/lib/axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getStorageValuesByKey } from "@/helpers/localStorage";
import { InitialValuesProps } from "@/types/companyTypes";
import { CompanyFormFields } from "./companyFormFields";

type Props = {
  onClose: () => void;
  onCreate: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateCompany({
  onClose,
  onCreate,
  open,
  onOpenChange,
}: Props) {
  // const [array, setArray] = useState<any[]>([]);
  const initialValues: InitialValuesProps = {
    imjakompanii: getStorageValuesByKey("imjakompanii") || "",
    kodkompanii: getStorageValuesByKey("kodkompanii") || "",
    dyrector: getStorageValuesByKey("dyrector") || "",
    stvorena: getStorageValuesByKey("stvorena") || "",
    nomertel: getStorageValuesByKey("nomertel") || "",
    adresa: getStorageValuesByKey("adresa") || "",
    kilkprac: getStorageValuesByKey("kilkprac") || "",
    kilkprychepiv: getStorageValuesByKey("kilkprychepiv") || "",
    kilkavto: getStorageValuesByKey("kilkavto") || "",
    strahfirm: getStorageValuesByKey("strahfirm") || "",
  };

  const handleCreate = async (
    values: typeof initialValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { setSubmitting, setStatus }: any
  ) => {
    setSubmitting(true);
    try {
      const res = await instance.post("/company/register", values);
      // localStorage.setItem("tester", JSON.stringify(res));
      // const parsed = localStorage.getItem("tester");
      // console.log(parsed);

    
      // console.log("RES from DB", res.data[0]);
      // let arr = [];
      // arr.push(res.data[0]);
      // setArray(arr);
      
      // if (res.status == 200 || res.status == 201) {
      onCreate();
      onClose();
      // }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setStatus("Помилка при створенні");
    } finally {
      setSubmitting(false);
    }
  };
  // const createCompany = async ()=>{
  // const res = await dispatch(fetchUserById())
  // }

  const testData = async () => {
    try {
      const res = await instance.get("/company");
      const data = res.data;
      // console.log(data);
      localStorage.setItem("data-test", JSON.stringify(data));
      const localData = localStorage.getItem("data-test");
      if (localData) {
        const value = JSON.parse(localData);
        // localStorage.removeItem('dyrector') // - вибіркови водаляю
        // localStorage.clear();
        console.log(value);
      } else {
        console.log("Немає потрібних даних у localstorage");
      }
      // console.log(localData);
    } catch (error) {
      console.log("TEST ERROR: ", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="italic">
        <SheetTitle className="pt-2 pl-2">Додати компанію</SheetTitle>
        <SheetDescription className="pl-2">
          Заповніть всі обовязкові поля
        </SheetDescription>
        <Button onClick={testData}>Тест localStorage</Button>
        <SheetHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={companyProductSchema}
            onSubmit={handleCreate}
          >
            {(formik: FormikProps<any>) => (
              <Form className="grid gap-4 py-4">
                <CompanyFormFields formik={formik} />

                {formik.status && (
                  <p className="text-red-500 text-sm">{formik.status}</p>
                )}
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="button" variant="outline" onClick={onClose}>
                      Скасувати
                    </Button>
                  </SheetClose>
                  <Button type="submit" disabled={formik.isSubmitting}>
                    Додати компанію
                  </Button>
                </SheetFooter>
              </Form>
            )}
          </Formik>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
