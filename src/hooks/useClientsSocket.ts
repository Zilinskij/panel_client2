'use client'

import { socket } from "@/lib/socket";
import { updateClientFromSocket } from "@/store/company/companyEdit";
import { AppDispatch } from "@/store/store";
import { ClientsIst } from "@/types/companyClients";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useClientSocket = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Підключено до Socket.IO");
    });
    socket.on("data_table_updated", (data: ClientsIst[]) => {
      console.log("Отримано нові дані через сокет: ", data);
      dispatch(updateClientFromSocket(data));
    });
    return () => {
      socket.disconnect();
      console.log("Socket.IO відключено");
    };
  }, [dispatch]);
};
