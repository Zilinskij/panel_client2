import instance from "@/lib/axios";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

import { EditCompanyForm } from "./editCompanyForm";
import { useState } from "react";
import { ClientsValue } from "@/types/companyTypes";

type Props = {
  company: {
    id: number;
    imjakompanii: string;
    kodkompanii?: number | string;
    dyrector?: string;
    stvorena?: string | number;
    nomertel?: number | string;
    adresa?: string;
    kilkprac?: number | string;
    kilkprychepiv?: number | string;
    kilkavto?: number | string;
    strahfirm?: string;
  };
  onClose: () => void;
  onUpdate: (updatedCompany: Props["company"]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (values: any, formikHelpers: any) => void;
};

export default function EditCompanyModal({
  company,
  onClose,
  onUpdate,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const initialValues = {
    id: company.id,
    imjakompanii: company.imjakompanii,
    kodkompanii: company.kodkompanii ?? "",
    dyrector: company.dyrector ?? "",
    stvorena: company.stvorena ?? "",
    nomertel: company.nomertel ?? "",
    adresa: company.adresa ?? "",
    kilkprac: company.kilkprac ?? "",
    kilkprychepiv: company.kilkprychepiv ?? "",
    kilkavto: company.kilkavto ?? "",
    strahfirm: company.strahfirm ?? "",
  };

  const handleSubmit = async (
    values: ClientsValue,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { setSubmitting, setStatus }: any
  ) => {
    setSubmitting(true);
    try {
      const res = await instance.put(`/company/update/${company.id}`, values);
      if (res.status === 200 || res.status === 201) {
        console.log(res.status);
        setShowModal(true);
        onUpdate({ ...company, ...values });
      }
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setStatus({ general: "Помилка при оновленні" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Sheet open={!!company} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="italic">
          <SheetHeader>
            <SheetTitle className="pt-2 pl-2">Редагувати дані</SheetTitle>
            <SheetDescription>
              Впевніться в правильності даних перед збереженням
            </SheetDescription>
          </SheetHeader>
          <EditCompanyForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </SheetContent>
      </Sheet>
      {showModal && (
        <span className="text-blue-500 text-sm mt-2">Дані успішно змінено</span>
      )}
    </div>
  );
}
