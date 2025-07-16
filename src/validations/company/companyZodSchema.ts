import { z } from "zod";

export const companyZodSchema = z.object({
  company_name: z
    .string({
      required_error: "Будь-ласка, введіть назву компанії",
    })
    .min(1, "Назва обов`язкова"),
  edrpou: z
    .string({
      required_error: "Заповніть це поле",
    })
    .min(1, "Обов`язкове значення"),
  id_country: z
    .number({
      required_error: "Вкажіть код країни",
      invalid_type_error: "Код має бути числом",
    })
    .min(1, "Вкажіть код країни"),
  locality: z
    .string({
      required_error: "Будь-ласка, вкажіть локацію",
    })
    .min(1, "Це обов'язкове значення"),
});

export type CompanyFormValues = z.infer<typeof companyZodSchema>;
