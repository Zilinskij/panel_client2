import * as Yup from "yup";

export const userRegisterSchema = Yup.object().shape({
  name: Yup.string().required("Вкажіть ім`я"),
  email: Yup.string()
    .required("Вкажіть електронну пошту")
    .email("Невірний формат"),
  password: Yup.string().required("Вкажіть пароль"),
});
