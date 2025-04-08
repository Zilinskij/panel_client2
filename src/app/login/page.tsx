"use client";

import { useState } from "react";
import { Login } from "@/types/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { instance } from "@/lib/axios";

export default function LoginPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState<Login>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await instance.post("/login", form);
      const user = res.data.user;
      const role = user?.role;
      console.log('роль користувача: ',role);
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "user") {
        router.push("/user");
      } else {
        setMessage("Невизначена роль користувача");
      }
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 404) {
        setMessage("Користувача не знайдено");
      } else {
        setMessage("Помилка під час авторизації");
      }
      console.error("Axios error:", error);
  }};

  const logOut = async () => {
    try {
      const data = await instance.get("/auth/logout");
      console.log(data);
      if (data.status === 200) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-6 bg-muted/30 p-4 text-center rounded-md">
      <h1 className="text-xl font-medium pb-4">Виконайте вхід</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button variant="outline" className="p-2 mt-3 shadow-sm rounded">
          Вхід
        </Button>
      </form>
      {message && <p className="text-blue-400 mt-6">{message}</p>}
      <Button
        variant={"secondary"}
        className="mt-20 bg-red-200"
        onClick={logOut}
      >
        Вийти
      </Button>
      {showModal && <span>Ви успішно вийшли</span>}

    </div>
  );
}
