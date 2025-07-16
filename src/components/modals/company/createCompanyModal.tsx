"use client";

import { createCompany, fetchCompany } from "@/store/companies/companies";
import { toggleCreateCompanyModal } from "@/store/modals/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  CompanyFormValues,
  companyZodSchema,
} from "@/validations/company/companyZodSchema";
import {
  ErrorMessage,
  FastField,
  Field,
  FieldProps,
  Form,
  Formik,
} from "formik";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { SelectCountry } from "@/components/company/selectCountry";

const initialValues: CompanyFormValues = {
  company_name: "",
  id_country: 11,
  locality: "",
  edrpou: "",
};

const CreateCompanyModal = () => {
  const isOpen = useSelector(
    (state: RootState) => state.modals.createCompanyModal
  );

  const dispatch = useDispatch<AppDispatch>();
  const limit = useSelector((state: RootState) => state.companies.actualLimit);
  const page = useSelector((state: RootState) => state.companies.actualPage);
  const countries = useSelector(
    (state: RootState) => state.companies.allFieldsCompany
  );

  const handleClose = () => {
    dispatch(toggleCreateCompanyModal());
  };

  const handleSubmit = async (e: CompanyFormValues) => {
    const result = await dispatch(
      createCompany({
        id_admuser: 4,
        company_name: e.company_name,
        id_country: e.id_country,
        locality: e.locality,
        edrpou: e.edrpou,
      })
    );
    if (createCompany.fulfilled.match(result)) {
      dispatch(fetchCompany({ limit, page }));
      toast.success("Успішно створено компанію");
      handleClose();
    } else {
      toast.error("Виникла помилка");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-gray-500/10 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background rounded-lg shadow-lg w-full max-w-lg p-6 dark:border dark:border-gray-100">
            <Formik
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(companyZodSchema)}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <label className="block text-gray-700 dark:text-white mb-2">
                    Назва компанії
                  </label>
                  <FastField name="company_name">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        placeholder="назва"
                        className="w-full border bg-gray-100 rounded-sm px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white"
                      />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="company_name"
                    component="div"
                    className="text-red-500 text-sm mb-2"
                  />

                  <label className="block text-gray-700 dark:text-white mb-2">
                    ЄДРПОУ
                  </label>
                  <FastField name="edrpou">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        placeholder="ЄДРПОУ"
                        className="w-full border bg-gray-100 rounded-sm px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white"
                      />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="edrpou"
                    component="div"
                    className="text-red-500 text-sm mb-2"
                  />

                  <label className="block text-gray-700 dark:text-white mb-2">
                    Країна
                  </label>
                  <Field name="id_country">
                    {({ field, form, meta }: FieldProps) => (
                      <SelectCountry
                        field={field}
                        form={form}
                        countries={countries}
                        meta={meta}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="id_country"
                    component="div"
                    className="text-red-500 text-sm mb-2"
                  />

                  <label className="block text-gray-700 dark:text-white mb-2">
                    Локація
                  </label>
                  <Field name="locality">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        placeholder="локація"
                        className="w-full border bg-gray-100 rounded-sm px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white"
                      />
                    )}
                  </Field>

                  <ErrorMessage
                    name="locality"
                    component="div"
                    className="text-red-500 text-sm mb-2"
                  />

                  <div className="mt-6 flex md:justify-between flex-col gap-2 md:flex-row">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 cursor-pointer"
                    >
                      Закрити
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 disabled:opacity-50 cursor-pointer"
                    >
                      Створити
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCompanyModal;
