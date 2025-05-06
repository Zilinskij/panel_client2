"use client";

import { AppDispatch, RootState } from "@/store/store";
import { getMe, logoutUser } from "@/store/user/userSlice";
import { ArrowRightFromLine, Dog, UserRoundCheck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import instance from "@/lib/axios";
import { HeaderMenu } from "./header.menu";
import Link from "next/link";
import { ModeToggle } from "../myStyledComponents/system/themeButton";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const router = useRouter();

  useEffect(() => {
    dispatch(getMe());
  }, []);
  const handleLogout = async () => {
    try {
      const { data } = await instance.post("/auth/logout");

      if (data.status === "ok") {
        dispatch(logoutUser());
        router.replace("/login");
      }
    } catch (error) {
      console.log("Помилка виходу: ", error);
    }
  };
  const autorization = async () => {
    router.push("/login");
  };
  if (!user?.id) {
    return null;
  }
  return (
    <header className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-500">
      <div className="flex justify-between mx-4 py-2">
        <div className="logo">
          <Link href={"/admin"}>
            <Dog className="w-[40px] h-[40px] bg-amber-300 rounded-sm" />
          </Link>
        </div>
        <div className="header_menu">
          <HeaderMenu />
        </div>
        <div className="flex text-xl">
        <ModeToggle />
          {user?.name ? (
            <div className="ml-4 flex">
              {user?.name}
              <UserRoundCheck className="w-[40px] h-[40px] bg-amber-300 rounded-sm mx-2" />
            </div>
          ) : (
            <Button variant="outline" onClick={autorization}>
              Авторизуватись
            </Button>
          )}
          <Button
            onClick={handleLogout}
            className="border-red-300 mx-4"
            variant="outline"
          >
            Вийти
            <ArrowRightFromLine />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
