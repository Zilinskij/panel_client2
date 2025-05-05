import { FormikProps } from "formik";
import { CompanyFormField } from "./companyFormField";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: FormikProps<any>;
};

export const CompanyFormFields = ({ formik }: Props) => {
  const handleChange = (name: string, value: string) => {
    if (formik) {
      formik.setFieldValue(name, value);
    }
    localStorage.setItem(name, value);
  };

  return (
    <>
      <CompanyFormField
        name="imjakompanii"
        label="Назва компанії"
        placeholder="Назва компанії"
        onChange={(e) => handleChange("imjakompanii", e.target.value)}
      />
      <CompanyFormField
        name="kodkompanii"
        label="Код компанії"
        placeholder="Код компанії"
        onChange={(e) => handleChange("kodkompanii", e.target.value)}
      />
      <CompanyFormField
        name="dyrector"
        label="Директор"
        placeholder="Директор"
        onChange={(e) => handleChange("dyrector", e.target.value)}
      />
      <CompanyFormField
        name="stvorena"
        label="Дата заснування"
        placeholder="Дата заснування"
        onChange={(e) => handleChange("stvorena", e.target.value)}
      />
      <CompanyFormField
        name="nomertel"
        label="Телефон"
        placeholder="Телефон"
        onChange={(e) => handleChange("nomertel", e.target.value)}
      />
      <CompanyFormField
        name="adresa"
        label="Адреса"
        placeholder="Адреса"
        onChange={(e) => handleChange("adresa", e.target.value)}
      />
      <CompanyFormField
        name="kilkprac"
        label="К-сть працівників"
        placeholder="К-сть працівників"
        onChange={(e) => handleChange("kilkprac", e.target.value)}
      />
      <CompanyFormField
        name="kilkavto"
        label="К-сть автомобілів"
        placeholder="К-сть автомобілів"
        onChange={(e) => handleChange("kilkavto", e.target.value)}
      />
      <CompanyFormField
        name="kilkprychepiv"
        label="К-сть причепів"
        placeholder="К-сть причепів"
        onChange={(e) => handleChange("kilkprychepiv", e.target.value)}
      />
      <CompanyFormField
        name="strahfirm"
        label="Страхування"
        placeholder="Страхування"
        onChange={(e) => handleChange("strahfirm", e.target.value)}
      />
    </>
  );
};
