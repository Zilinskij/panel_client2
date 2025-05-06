"use client";

import CompanyTable from "@/components/company/CompanyTable";
// import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

const Companyes = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    socket.on("update1", (data) => {
      console.log(data, "data from socket");
    });
  
  }, [socket]);

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
