import * as Yup from "yup";

export const companyProductSchema = Yup.object().shape({
  imjakompanii: Yup.string().required("Введіть назву"),
  kodkompanii: Yup.string()
    .matches(/^[0-9]+$/, "Код повинен містити лише цифри")
    .min(5, "Закороткий код")
    .max(40, "Задовгий код")
    .required(),
  dyrector: Yup.string(),
  stvorena: Yup.number(),
  nomertel: Yup.string()
    .max(13, "Максимум можливо 13 цифр!")
    .matches(/^\+/, "Повинен починатися з +")
    .required("Номер телефону обов’язковий"),
  adresa: Yup.string(),
  kilkprac: Yup.number(),
  kilkprychepiv: Yup.number(),
  kilkavto: Yup.number().required("Вкажіть к-сть машин!"),
  strahfirm: Yup.string(),
});
