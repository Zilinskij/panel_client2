"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Register } from "@/types/login";
import { instance } from "@/lib/axios";

export default function RegisterPage() {
  const [form, setForm] = useState<Register>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await instance.post("/register", form);
      if (res.status === 201) {
        setMessage("Успішна реєстрація");
      } else {
        setMessage("Помилка під час реєстрації");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 409) {
        setMessage("Користувач з такою поштою вже існує");
      } else {
        setMessage("Помилка під час реєстрації");
      }
      console.error("Axios error:", error);
    }
  };
  return (
    <div className="m-6 bg-muted/40 p-4 text-center rounded-md">
      <h1 className="text-xl font-medium pb-4">Виконайте реєстрацію</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Ім'я"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button variant={"outline"} className="p-2 mt-3 shadow-sm rounded">
          Зареєструватися
        </Button>
      </form>
      {message && <p className="text-blue-400 mt-6">{message}</p>}
    </div>
  );
}
