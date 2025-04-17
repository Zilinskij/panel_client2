"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Register } from "@/types/login";
import instance from "@/lib/axios";
import { Formik, Form, Field } from "formik";
import { userRegisterSchema } from "@/validations/user/user.validations";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const initialValues: Register = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: Register) => {
    try {
      const res = await instance.post("/users/register", values);
      if (res.status === 201) {
        setMessage("Успішна реєстрація");
        console.log(values);
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
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={userRegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col items-center justify-center">
              <Field
                name="name"
                placeholder="Ім'я"
                className="my-2 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-[400px] text-center border-gray-300 border-1 rounded-md p-2"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
              <Field
                name="email"
                placeholder="Email"
                className="my-2 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-[400px] text-center border-gray-300 border-1 rounded-md p-2"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
              <Field
                name="password"
                placeholder="Пароль"
                className="my-2 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-[400px] text-center border-gray-300 border-1 rounded-md p-2"
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
              <Button
                type="submit"
                variant={"outline"}
                className="p-2 mt-3 shadow-sm rounded"
              >
                Зареєструватися
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {message && <p className="text-blue-400 mt-6">{message}</p>}
    </div>
  );
}
