"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AdminPage() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const router = useRouter();

  console.log("name admin page", user?.name);

  useEffect(() => {
    socket.connect();
  }, []);
  useEffect(() => {
    if (!user?.id) {
      router.replace("/login");
    }
  }, [router, user?.id]);

  if (!user?.id) {
    return null;
  }

  return (
    <div className="p-2">
      <div>
        <div className="flex">Головна сторінка</div>
      </div>
    </div>
  );
}
