"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Props } from "@/types/companyTypes";
import { jwtDecode } from "jwt-decode";

type Role = "admin" | "user";

interface TokenPayload {
  role: Role;
  exp: number;
}

export default function AuthGuard({ children, allowedRoles }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/register");
      return;
    }
    try {
      const decodedToken = jwtDecode<TokenPayload>(token);
      const isExpiried = decodedToken.exp * 1000 < Date.now();
      if (isExpiried) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      if (!allowedRoles.includes(decodedToken.role)) {
        router.push("/");
        return;
      }
      setAuthorized(true);
    } catch {
      router.push("/login");
    }
  }, [router, allowedRoles]);

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
