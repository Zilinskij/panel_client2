import { useState } from "react";
import { instance } from "@/lib/axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
};

export default function EditCompanyModal({
  company,
  onClose,
  onUpdate,
}: Props) {
  const [imjakompanii, setImjakompanii] = useState(company.imjakompanii);
  const [kodkompanii, setKodkompanii] = useState(company.kodkompanii ?? "");
  const [dyrector, setDyrektor] = useState(company.dyrector ?? "");
  const [stvorena, setStvorena] = useState(company.stvorena ?? "");
  const [nomertel, setNomertel] = useState(company.nomertel ?? "");
  const [adresa, setAdresa] = useState(company.adresa ?? "");
  const [kilkprac, setKilkprac] = useState(company.kilkprac ?? "");
  const [kilkprychepiv, setKilkprychepiv] = useState(
    company.kilkprychepiv ?? ""
  );
  const [kilkavto, setKilkavto] = useState(company.kilkavto ?? "");
  const [strahfirm, setStrahfirm] = useState(company.strahfirm ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedData = {
        imjakompanii,
        kodkompanii,
        dyrector: dyrector || "",
        stvorena: stvorena || "",
        nomertel: nomertel || "",
        adresa: adresa || "",
        kilkprac: kilkprac || "",
        kilkprychepiv: kilkprychepiv || "",
        kilkavto: kilkavto || "",
        strahfirm: strahfirm || "",
      };

      console.log(updatedData);
      const res = await instance.put(`/company/${company.id}`, updatedData);
      console.log("ID компанії для оновлення:", res.data);

      if (res.status === 200 || res.status === 201) {
        onUpdate({ ...company, ...updatedData });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Помилка при оновленні");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={!!company} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Редагувати дані</SheetTitle>
          <SheetDescription>
            Впевніться в правдивості даних перед збереженням
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              Назва
            </Label>
            <Input
              value={imjakompanii}
              onChange={(e) => setImjakompanii(e.target.value)}
              placeholder="Назва компанії"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              Код компанії
            </Label>
            <Input
              value={kodkompanii}
              onChange={(e) => setKodkompanii(e.target.value)}
              placeholder="Код компанії"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              Директор
            </Label>
            <Input
              value={dyrector}
              onChange={(e) => setDyrektor(e.target.value)}
              placeholder="Директор компанії"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              Дата заснування
            </Label>
            <Input
              value={stvorena}
              onChange={(e) => setStvorena(e.target.value)}
              placeholder="Дата створення компанії"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              Телефон
            </Label>
            <Input
              value={nomertel}
              onChange={(e) => setNomertel(e.target.value)}
              placeholder="Номер телефону компанії"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              Адреса
            </Label>
            <Input
              value={adresa}
              onChange={(e) => setAdresa(e.target.value)}
              placeholder="Адреса компанії"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              К-сть працівників
            </Label>
            <Input
              value={kilkprac}
              onChange={(e) => setKilkprac(e.target.value)}
              placeholder="Кількість працівників компанії"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              К-сть причепів
            </Label>
            <Input
              value={kilkprychepiv}
              onChange={(e) => setKilkprychepiv(e.target.value)}
              placeholder="Кількість причепів компанії"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              К-сть автомобілів
            </Label>
            <Input
              value={kilkavto}
              onChange={(e) => setKilkavto(e.target.value)}
              placeholder="Кількість автомобілів компанії"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left pl-2 italic">
              Страхування
            </Label>
            <Input
              value={strahfirm}
              onChange={(e) => setStrahfirm(e.target.value)}
              placeholder="Страхова фірма компанії"
            />
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <SheetFooter>
          <SheetClose>
            <Button variant="outline" onClick={onClose}>
              Скасувати
            </Button>
          </SheetClose>
          <SheetClose>
            <Button type="submit" onClick={handleUpdate} disabled={loading}>
              Зберегти зміни
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
