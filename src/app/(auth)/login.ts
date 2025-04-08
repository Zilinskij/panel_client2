import { instance } from "@/lib/axios";

export async function loginUser(email: string, password: string) {
  try {
    const res = await instance.post("/login", {
      email,
      password,
    });
    const { role } = res.data;
    return { success: true, role };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Помилка логіну:", err.message);
    return { success: false, message: err.message };
  }
}
