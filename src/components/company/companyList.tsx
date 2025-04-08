"use client";

import { useEffect, useState } from "react";
import { instance } from "@/lib/axios";
import { Button } from "../ui/button";
import EditCompanyModal from "./editCompanyModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
type Company = {
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

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [deleteCompany, setDeleteCompany] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await instance.get("/company");
        setCompanies(res.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Помилка при завантаженні даних про компанії");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await instance.delete(`/company/${id}`);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== id)
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Помилка при видаленні компанії");
    } finally {
      setLoading(false);
      setDeleteCompany(null);
    }
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Компанії</h2>
      <table className="w-full border ">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Назва</th>
            <th className="p-2 border">Код компанії</th>
            <th>Директор</th>
            <th>Заснована</th>
            <th>Номер телефону</th>
            <th>Адреса</th>
            <th>Кількість працівників</th>
            <th>Кількісь авто</th>
            <th>Кількість причепів</th>
            <th>Компанія - страхувальник</th>
            <th className="p-2 border">Дії</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-gray-50">
              <td className="p-2 border">{company.id}</td>
              <td className="p-2 border">{company.imjakompanii}</td>
              <td className="p-2 border">{company.kodkompanii}</td>
              <td className="p-2 border">{company.dyrector}</td>
              <td className="p-2 border">{company.stvorena}</td>
              <td className="p-2 border">{company.nomertel}</td>
              <td className="p-2 border">{company.adresa}</td>
              <td className="p-2 border">{company.kilkprac}</td>
              <td className="p-2 border">{company.kilkavto}</td>
              <td className="p-2 border">{company.kilkprychepiv}</td>
              <td className="p-2 border">{company.strahfirm}</td>
              <td className="p-2 border text-center">
                <div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCompany(company)}
                    className="border-amber-400 mx-2"
                  >
                    ✏️ Редагувати
                  </Button>
                  <Button
                    variant={"outline"}
                    className="border-red-400 mx-2"
                    onClick={() => setDeleteCompany(company.id)}
                  >
                    Видалити
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCompany && (
        <EditCompanyModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onUpdate={(updatedCompany) => {
            setCompanies((prev) =>
              prev.map((c) => (c.id === updatedCompany.id ? updatedCompany : c))
            );
            setSelectedCompany(null);
          }}
        />
      )}
      {deleteCompany && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center">
          <Dialog
            open={!!deleteCompany}
            onOpenChange={(open) => !open && setDeleteCompany(null)}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogDescription>
                  Ви впевнені? Ця дія не може бути скасована!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteCompany(null)}
                >
                  Скасувати
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    handleDelete(deleteCompany);
                  }}
                >
                  Видалити
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
