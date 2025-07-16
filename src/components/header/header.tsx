"use client";

import { AppDispatch, RootState } from "@/store/store";
import { getMe, logoutUser } from "@/store/user/userSlice";
import { ArrowRightFromLine, House, Menu, UserRoundCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import instance from "@/lib/axios";
import { HeaderMenu } from "./header.menu";
import Link from "next/link";
import { ModeToggle } from "../myStyledComponents/system/themeButton";

const Header = () => {
  const [mobileShow, setMobileShow] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getMe()).unwrap();
      } catch (error) {
        console.log("Not logget in", error);
      }
    };
    if (!user) fetchUser();
  }, [dispatch, user]);

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
    <div>
      <header className="fixed top-0 z-20 bg-gray-100 w-full dark:bg-gray-500 ">
        <div className="flex justify-between mx-4 py-2">
          <div className="logo">
            <Link href={"/admin"}>
              <House className="w-[40px] h-[40px] text-amber-500 rounded-sm" />
            </Link>
          </div>

          <div className={`header_menu hidden md:block my-auto`}>
            <HeaderMenu />
          </div>
          <div
            className="header__burger flex md:hidden my-auto"
            onClick={() => setMobileShow(!mobileShow)}
          >
            <Menu />
          </div>
          <div className="text-xl flex my-auto">
            <ModeToggle />
            {user?.name ? (
              <div className="ml-4 flex">
                {user?.name}
                <UserRoundCheck className="w-[40px] h-[40px] text-amber-500 rounded-sm mx-2 my-auto" />
              </div>
            ) : (
              <Button variant="outline" onClick={autorization}>
                Авторизуватись
              </Button>
            )}
            <Button
              onClick={handleLogout}
              className="border-red-300 mx-4 md:hidden"
              variant="outline"
            >
              <ArrowRightFromLine />
            </Button>
            <Button
              onClick={handleLogout}
              className="border-red-300 mx-4 hidden md:flex"
              variant="outline"
            >
              Вийти
              <ArrowRightFromLine />
            </Button>
          </div>
        </div>
      </header>

      {/* {mobileShow && <HeaderMobile toggle={toggleShowMobile} />} */}
    </div>
  );
};

export default Header;
