"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function InputPage() {
  const [form, setForm] = useState({
    imjakompanii: "",
    kodkompanii: '',
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.status === 201) {
      setMessage("Дані внесено успішно");
    } else if (res.status === 409) {
      setMessage("Компанія з таким іменем вже існує");
    } else setMessage("Помилка під час внесення даних");
  };

  return (
    <div className="m-6 bg-muted/40 p-4 text-center rounded-md">
      <h1 className="text-xl font-medium pb-4">Внесення даних в базу</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="imjakompanii"
          placeholder="Назва компанії"
          value={form.imjakompanii}
          onChange={handleChange}
          required
        />
        <Input
          name="kodkompanii"
          type="number"
          placeholder="Код компанії"
          value={form.kodkompanii}
          onChange={handleChange}
          required
        />
        <Button variant={"outline"} className="p-2 mt-2 shadow-sm rounded">
          Внести дані
        </Button>
      </form>
      {message && <p className="text-blue-400 mt-6">{message}</p>}
    </div>
  );
}
