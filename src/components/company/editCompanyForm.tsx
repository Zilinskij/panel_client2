import { companyProductSchema } from "@/validations/company/company.validations";
import { CompanyFormFields } from "./companyFormFields";
import { Formik, Form } from "formik";
import { SheetFooter } from "../ui/sheet";
import { Button } from "../ui/button";
import { SheetClose } from "../ui/sheet";

type Props = {
  initialValues: any;
  onSubmit: (value: any, formikHelpers: any) => void;
  onCancel: () => void;
};

export const EditCompanyForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={companyProductSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className="grid gap-4 p-4">
          <CompanyFormFields />
          {status?.general && <p className="text-red-500 text-sm">{status.general}</p>}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant="outline" onClick={onCancel}>
                Скасувати
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isSubmitting}>
              Зберегти зміни
            </Button>
          </SheetFooter>
        </Form>
      )}
    </Formik>
  );
};
