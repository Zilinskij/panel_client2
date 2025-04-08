"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "user") {
      router.push("/login");
    }
  }, []);

  return <h2 className="text-green-400">Панель користувача</h2>;
}
