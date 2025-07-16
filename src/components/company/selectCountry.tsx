"use client";

import { FieldProps } from "formik";

interface Props extends FieldProps {
  countries: { id: number; country_name: string }[];
}

export const SelectCountry = ({ field, form, countries }: Props) => {
  const selectedId = field.value;

  return (
    <select
      {...field}
      value={selectedId || ""}
      onChange={(e) => {
        const selectedValue = Number(e.target.value);
        form.setFieldValue(field.name, selectedValue);
      }}
      className="w-full border bg-gray-100 rounded-sm px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white"
    >
      <option value="">Оберіть країну</option>
      {countries.map((country) => (
        <option key={country.id} value={country.id}>
          {country.country_name}
        </option>
      ))}
    </select>
  );
};
