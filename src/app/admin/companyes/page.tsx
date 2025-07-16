/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { socket } from "@/lib/socket";
import { updateClient } from "@/store/company/companyEdit";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Companyes = () => {
  const dispatch = useDispatch<AppDispatch>()
 
  useEffect(() => {
    socket.on("update_result:company", (data) => {
      console.log(data);
    dispatch(updateClient(data))
    });
  }, [socket,dispatch]);
  

  // const handleGo = () => {
  //   socket.emit('update', {email: "roman"})
  // }

  return (
    <div>
     Test page
    </div>
  );
};
export default Companyes;
