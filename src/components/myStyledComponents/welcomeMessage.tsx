"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { setModalState } from "@/store/modals/modalsSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function WelcomeMessage() {
  const { name } = useSelector((state: RootState) => state.user);
  const message = useSelector(
    (state: RootState) => state.modals.createUserModal
  );
  const dispatch = useDispatch();

  const setModalStateChange = () => {
    dispatch(setModalState(true));
    setTimeout(() => {
      dispatch(setModalState(false));
    }, 2000);
  };
  useEffect(() => {
    setModalStateChange();
  }, []);

  return (
    <AlertDialog open={message}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription className="text-2xl text-red-500">
            {`Вітаємо на сторінці профілю, ${name}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
