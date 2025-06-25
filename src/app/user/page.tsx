"use client";

import { WelcomeMessage } from "@/components/myStyledComponents/welcomeMessage";
import { Button } from "@/components/ui/button";
import instance from "@/lib/axios";
import { RootState } from "@/store/store";
import { ArrowRightFromLine } from "lucide-react";
import { useSelector } from "react-redux";

export default function UserPage() {
  const { name } = useSelector((state: RootState) => state.user);

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
      <div className="flex justify-between">
        <WelcomeMessage />
        <h2 className="text-xl text-blue-400">Сторінка користувача {name}</h2>
        <Button
          onClick={handleLogout}
          className="border-red-300"
          variant="outline"
        >
          Вийти
          <ArrowRightFromLine />
        </Button>
      </div>
    </div>
  );
}
