"use client";

import { toggleEditKeyModal } from "@/store/modals/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { addTranslate, translateByKey } from "@/store/translate/translateSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

export function UpdateKeyModal() {
  const dispatch = useDispatch<AppDispatch>();
  const ideasModal = useSelector(
    (state: RootState) => state.modals.updateKeyModal
  );
  const [keystrValue, setKeystrValue] = useState<string>("");
  const selectedEditValue = useSelector(
    (state: RootState) => state.translate.fieldsData
  );
  const user = useSelector((state: RootState) => state.user.currentUser);
  const tbl = useSelector((state: RootState) => state.translate.selectedTbl);

  const handleClose = () => {
    dispatch(toggleEditKeyModal());
  };
  const handleToast = () => {
    toast.success("Редагування відмінено");
  };
  const handleSave = async () => {
    if (!keystrValue.trim()) return null;

    const result = await dispatch(
      addTranslate({
        ...selectedEditValue,
        expr: selectedEditValue[0].expr,
        id_admuser: Number(user!.id),
        tbl: tbl,
        fld: "expr",
        keystr: keystrValue,
        lang: selectedEditValue[0].lang,
      })
    );
    if (addTranslate.fulfilled.match(result)) {
      dispatch(translateByKey({ key: keystrValue, tbl: tbl }));
      toast.success("Успішно відредаговано");
      handleClose();
    } else {
      toast.error("Помилка при редагуванні");
    }
  };

  return (
    <div>
      {ideasModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-gray-500/10 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background rounded-lg shadow-lg w-full max-w-lg p-6 dark:border-gray-100 dark:border-1">
            <h2 className="text-xl font-bold mb-4">Оновіть значення ключа:</h2>
            <label className="block text-gray-700 dark:text-white mb-2">
              Ви обрали ключ:
            </label>
            <input
              type="text"
              value={selectedEditValue[0].keystr || ""}
              readOnly
              className="w-full border rounded-md px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white cursor-default bg-gray-100 dark:opacity-80"
              placeholder={
                selectedEditValue[0].keystr || "значення ключа не відоме"
              }
            />

            <label className="block text-gray-700 dark:text-white mb-2">
              Введіть нове значення:
            </label>
            <textarea
              onChange={(e) => setKeystrValue(e.target.value)}
              className="w-full h-32 border rounded-md px-3 py-2 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="новий ключ"
            />

            <div className="mt-6 flex md:justify-between flex-col gap-2 md:flex-row ">
              <button
                onClick={() => {
                  handleClose();
                  handleToast();
                }}
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 cursor-pointer"
              >
                Закрити
              </button>
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 cursor-pointer"
                onClick={handleSave}
              >
                Зберегти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
