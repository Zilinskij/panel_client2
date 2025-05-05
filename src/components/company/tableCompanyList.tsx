"use client";

import { useEffect, useState } from "react";
import instance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import EditCompanyModal from "./editCompanyModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import getColumns from "@/components/company/column";
import { DataTable } from "../ui/data-table";
import React from "react";
import ProgressBar from "../myStyledComponents/progressBar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";

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
  const succesMessage = useSelector(
    (state: RootState) => state.user.succesMessage
  );

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
      await instance.delete(`/delete/${id}`);
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

  // const { role } = useSelector((state: RootState) => state.user);
 

  if (loading && !succesMessage) return <ProgressBar start={5} duration={150} end={90} />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <DataTable
        columns={getColumns(setSelectedCompany, setDeleteCompany,)}
        data={companies}
      />

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
