"use client";

import { toggleDeleteValueModal } from "@/store/modals/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  deleteTranslate,
  translateByKey,
} from "@/store/translate/translateSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const DeleteValueModal = () => {
  const ideasModal = useSelector(
    (state: RootState) => state.modals.deleteValueModal
  );
  const dispatch = useDispatch<AppDispatch>();
  const selectedValueToDelete = useSelector(
    (state: RootState) => state.modals.selectedTranslateValue
  );
  const [langValue, setLangValue] = useState<string>("");
  useEffect(() => {
    if (selectedValueToDelete) {
      setLangValue(selectedValueToDelete.ids!);
    }
  }, [selectedValueToDelete]);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const keystr = useSelector((state: RootState) => state.translate.keystr);
  const tbl = useSelector((state: RootState) => state.translate.selectedTbl)

  const handleDelete = async () => {
    const result = await dispatch(
      deleteTranslate({
        ...selectedValueToDelete,
        expr: selectedValueToDelete?.expr as string,
        id_admuser: Number(user!.id),
        tbl: tbl,
        fld: "expr",
        keystr: keystr,
        lang: langValue,
      })
    );
    if (deleteTranslate.fulfilled.match(result)) {
      dispatch(translateByKey({key: keystr, tbl: tbl}));
      toast.success("Успішно видалено");
      handleClose();
    } else {
      toast.error("Помилка при видаленні");
    }
  };

  const handleClose = () => {
    dispatch(toggleDeleteValueModal());
  };

  const handleToast = () => {
    toast.success("Ви передумали");
  };

  return (
    <div>
      {ideasModal && (
        <div className="fixed inset-0 bg-black/40 dark:bg-gray-500/10 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background rounded-lg shadow-lg w-full max-w-lg p-6 dark:border-gray-100 dark:border-1">
            <h2 className="text-xl font-bold mb-4">Видалення значення:</h2>
            <label className="block text-gray-700 dark:text-white mb-2">
              Ви обрали значення:
            </label>
            <input
              type="text"
              value={selectedValueToDelete?.expr || ""}
              readOnly
              className="w-full border rounded-md px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white cursor-default bg-gray-100 dark:opacity-80"
              placeholder={keystr || "значення ключа не відоме"}
            />
            <label className="block text-gray-700 dark:text-white mb-2">
              для мови:
            </label>
            <input
              type="text"
              value={langValue || ""}
              readOnly
              className="w-full border rounded-md px-3 py-2 mb-4 dark:bg-gray-800 dark:text-white cursor-default bg-gray-100 dark:opacity-80"
              placeholder={langValue || "значення ключа не відоме"}
            />
            <div className="mt-6 flex md:justify-between flex-col gap-2 md:flex-row ">
              <button
                onClick={() => {
                  handleClose();
                  handleToast();
                }}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 cursor-pointer"
              >
                Відмінити
              </button>
              <button
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                onClick={handleDelete}
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteValueModal;
