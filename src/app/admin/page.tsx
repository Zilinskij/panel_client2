"use client";

import CompanyList from "@/components/company/tableCompanyList";
import CreateCompany from "@/components/company/createCompanyList";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRightFromLine, CirclePlus } from "lucide-react";
import instance from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { WelcomeMessage } from "@/components/myStyledComponents/welcomeMessage";

export default function AdminPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { name } = useSelector((state: RootState) => state.user);

  const handleCreate = () => {};
  const handleClose = () => {
    setShowCreateForm(false);
  };
  const handleLogout = async () => {
    try {
      await instance.post("/auth/logout");
      window.location.replace("/login");
    } catch (error) {
      console.log("Помилка виходу: ", error);
    }
  };

  return (
    <div className="p-5">
      <WelcomeMessage />
      <h2 className="text-red-400 text-xl">Сторінка адміністратора {name}</h2>
      <div
        className="flex justify-end
       mx-6"
      >
        <div className="mx-4">
          <Button
            variant={"outline"}
            className="border-green-400"
            onClick={() => setShowCreateForm(true)}
          >
            <CirclePlus />
            Створити компанію
          </Button>
        </div>
        <Button
          onClick={handleLogout}
          className="border-red-300"
          variant="outline"
        >
          Вийти
          <ArrowRightFromLine />
        </Button>
      </div>
      <CompanyList />
      {showCreateForm && (
        <CreateCompany
          onCreate={handleCreate}
          onClose={handleClose}
          open={showCreateForm}
          onOpenChange={setShowCreateForm}
        />
      )}
    </div>
  );
}
