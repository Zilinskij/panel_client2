"use client";

import { useEffect, useState } from "react";
import { Login } from "@/types/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { forLogin, getMe } from "@/store/user/userSlice";


export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [systemMessage, setSystemMessage] = useState<string>("");

  const [form, setForm] = useState<Login>({
    email: "",
    password: "",
  });
  const user = useSelector((state: RootState) => state.user.currentUser);
  // const isLoading = useSelector((state: RootState) => state.user.status);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(forLogin(form));
    console.log(result, "result === login dispatch");

    if (result.payload.error_message) {
      setSystemMessage(result.payload.error_message);
      setTimeout(() => {
        setSystemMessage("");
      }, 2000);
    }

    console.log(result, "RESULT !!!!");
  };

  useEffect(() => {
    dispatch(getMe());
  }, []);

  useEffect(() => {
    if (user?.email && user?.id) {
      router.push("/admin");
    }
  }, [user,router]);



  // if (isLoading === Status.LOADING || isLoading === Status.SUCCESS) {
  //   return null;
  // }

  return (
    <div className="m-6 bg-muted/30 p-4 text-center rounded-md">
      <h1 className="text-xl font-medium pb-4">Виконайте вхід</h1>
      <form onSubmit={handleLogin} className="space-y-4">
      {systemMessage && <span>{systemMessage}</span>}

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
    </div>
  );
}
