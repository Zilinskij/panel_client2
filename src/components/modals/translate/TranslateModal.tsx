/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  toggleUpdateTranslateModal,
  updateTranslate,
} from "@/store/modals/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  translateByKey,
} from "@/store/translate/translateSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

const TranslateModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ideasModal = useSelector(
    (state: RootState) => state.modals.updateTranslateModal
  );
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [exprValue, setExprValue] = useState<string>("");
  const selectedValue = useSelector(
    (state: RootState) => state.modals.selectedTranslateValue
  );
  const keyStr = useSelector((state: RootState) => state.translate.keystr);
  const lang = useSelector((state: RootState) => state.translate.lang);
  const tbl = useSelector((state: RootState) => state.translate.selectedTbl);
  const handleClose = () => {
    dispatch(toggleUpdateTranslateModal());
  };

  useEffect(() => {
    if (selectedValue) {
      setExprValue(selectedValue.expr);
    }
  }, [selectedValue]);

  const handleSave = async () => {
    if (!exprValue) return;
    const response = await dispatch(
      updateTranslate({
        ...selectedValue,
        expr: exprValue,
        id_admuser: Number(user!.id),
        tbl: tbl,
        fld: "expr",
        keystr: keyStr,
        lang: lang,
      })
    );
    if (updateTranslate.fulfilled.match(response)) {
      dispatch(translateByKey({ key: keyStr, tbl: tbl }));
      toast.message("Таблицю доповнено");
    } else {
      toast.message("Помилка при оновленні");
    }
  };

  return (
    <>
      {ideasModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-gray-500/10 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background rounded-lg shadow-lg w-full max-w-lg p-6 dark:border-gray-100 dark:border-1">
            <h2 className="text-xl font-bold mb-4">Внесіть відповідні дані:</h2>
            <label className="block text-gray-700 dark:text-white mb-2"></label>
            <input
              type="text"
              readOnly
              value={selectedValue?.ids}
              className="w-full border rounded-md px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white cursor-default bg-gray-100 dark:opacity-80"
              placeholder="ids"
            />

            <label className="block text-gray-700 dark:text-white mb-2">
              Значення
            </label>
            <textarea
              value={exprValue ?? ""}
              onChange={(e) => setExprValue(e.target.value)}
              className="w-full h-32 border rounded-md px-3 py-2 dark:bg-gray-800 dark:text-white resize-none"
              placeholder=""
            />

            {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}

            <div className="mt-6 flex md:justify-between flex-col gap-2 md:flex-row ">
              <button
                onClick={handleClose}
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
    </>
  );
};

export default TranslateModal;
