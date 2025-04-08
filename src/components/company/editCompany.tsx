"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { instance } from "@/lib/axios";

interface EditCompanyProps {
  id: string;
  initialName: string;
}

export default function EditCompany({ id }: EditCompanyProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await instance.get(`/company/${id}`);
        setName(res.data.imjakompanii);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setMessage("Не вдалося завантажити дані компанії");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await instance.put(`/company/${id}`, {
        imjakompanii: name,
      });

      if (res.status === 201) {
        setMessage("Назву компанії оновлено");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 409) {
        setMessage("Компанія з такою назвою вже існує");
      } else {
        setMessage("Сталася помилка під час оновлення");
      }
    }
  };

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="space-y-4 max-w-md">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Нова назва компанії"
      />
      <Button onClick={handleUpdate}>Оновити</Button>
      {message && <p>{message}</p>}
    </div>
  );
}
