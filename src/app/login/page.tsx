"use client";

import { useEffect, useState } from "react";
import { Login } from "@/types/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setModalState } from "@/store/modals/modalsSlice";
import { forLogin } from "@/store/user/userSlice";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const userModal = useSelector(
    (state: RootState) => state.modals.createUserModal
  );

  const [form, setForm] = useState<Login>({
    email: "",
    password: "",
  });
  const { role, error } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(forLogin(form));
  };

  useEffect(() => {
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "user") {
      router.push("/user");
    }
  }, [role]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const setModalStateChange = () => {
    dispatch(setModalState(true));
    setTimeout(() => {
      dispatch(setModalState(false));
    }, 2000);
  };

  return (
    <div className="m-6 bg-muted/30 p-4 text-center rounded-md">
      <h1 className="text-xl font-medium pb-4">Виконайте вхід</h1>
      <Button onClick={setModalStateChange} className="mb-2" variant="outline">
        STATE CHANGE
      </Button>

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
      {error && <p className="text-blue-400 mt-6">{error}</p>}
      {userModal && <span>Everything is okay...user modal open</span>}
    </div>
  );
}
