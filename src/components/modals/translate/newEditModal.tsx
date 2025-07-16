"use client";

import { toggleCreateModal } from "@/store/modals/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { addTranslate, takeTranslateKey } from "@/store/translate/translateSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

export const NewEditModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.modals.newEditModal);
  const selectedValue = useSelector(
    (state: RootState) => state.translate.selectedRow
  );
  const user = useSelector((state: RootState) => state.user.currentUser);

  const [exprValue, setExprValue] = useState("");
  const [keystrVal, setKeystrVal] = useState("");
  const [codeVal, setCodeVal] = useState("uk");

  useEffect(() => {
    if (isOpen) {
      setCodeVal("uk");
      setExprValue("");
      setKeystrVal("");
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(toggleCreateModal());
  };

  const handleSave = async () => {
    if (!keystrVal.trim() || !exprValue.trim()) return;

    const result = await dispatch(
      addTranslate({
        id_admuser: Number(user!.id),
        lang: codeVal,
        expr: exprValue,
        keystr: keystrVal,
        tbl: "appterm",
        fld: "expr",
      })
    );
    if (addTranslate.fulfilled.match(result)) {
      dispatch(takeTranslateKey([]))
      toast.success("Успішно створено");
      handleClose();
    } else {
      toast.error("Виникла помилка при створенні");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-gray-500/10 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background rounded-lg shadow-lg w-full max-w-lg p-6 dark:border dark:border-gray-100">
            <h2 className="text-xl font-bold mb-4">
              {selectedValue ? "Редагування запису" : "Створення нового запису"}
            </h2>

            <label className="block text-gray-700 dark:text-white mb-2">
              Код мови
            </label>
            <input
              type="text"
              readOnly
              value={codeVal}
              className="w-full border bg-gray-100 rounded-md px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white"
            />

            <label className="block text-gray-700 dark:text-white mb-2">
              Ключ
            </label>
            <input
              autoFocus
              value={keystrVal}
              onChange={(e) => setKeystrVal(e.target.value)}
              className="w-full border rounded-md px-3 py-2 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="ключ"
            />

            <label className="block text-gray-700 dark:text-white mb-2">
              Значення
            </label>
            <textarea
              value={exprValue}
              onChange={(e) => setExprValue(e.target.value)}
              className="w-full h-32 border rounded-md px-3 py-2 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="значення"
            />

            <div className="mt-6 flex md:justify-between flex-col gap-2 md:flex-row">
              <button
                onClick={handleClose}
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 cursor-pointer"
              >
                Закрити
              </button>
              <button
                onClick={handleSave}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 disabled:opacity-50 cursor-pointer"
              >
                {selectedValue ? "Оновити" : "Створити"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
