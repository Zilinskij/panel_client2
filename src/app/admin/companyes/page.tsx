/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CompanyTable from "@/components/company/CompanyTable";
// import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { updateClient } from "@/store/company/companyEdit";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Companyes = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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
      {/* <Button onClick={handleGo}> 
        Тест
      </Button> */}
      <CompanyTable
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
};
export default Companyes;
