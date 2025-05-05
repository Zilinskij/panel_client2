'use client'

import CompanyTable from "@/components/company/CompanyTable";
import { useState } from "react";

const Companyes = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div>
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
