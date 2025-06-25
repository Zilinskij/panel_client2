import Link from "next/link";
import React from "react";

const MAIN_MENU = [
  { title: "Компанї", link: "/admin/companyes" },
  { title: "Адмін", link: "/admin" },
  { title: "Компанї", link: "/admin/companyes" },
  { title: "Транслейт", link: "/admin/translate-table" },
];
const HeaderMobile = ({ toggle }: { toggle: () => void }) => {
  return (
    <div className="absolute w-full top-0 left-0 flex bg-slate-200 h-[100vh] z-10">
      <div className="burger__wrapper justify-center w-1/3 m-auto">
        <nav>
          <ul className="flex flex-col gap-4">
            {MAIN_MENU.map((item, idx) => {
              return (
                <Link key={idx} onClick={toggle} href={item.link}>
                  {item.title}
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMobile;
