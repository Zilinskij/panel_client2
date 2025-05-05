/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CompanyFormProps } from "@/types/companyTypes";

export const CompanyFormField = ({
  name,
  label,
  placeholder,
  onChange,
}: CompanyFormProps) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Field name={name}>
        {({ field }: { field: any }) => (
          <Input
            {...field}
            id={name}
            placeholder={placeholder}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};
