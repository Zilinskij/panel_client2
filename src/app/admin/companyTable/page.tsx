'use client'

import CompanyTableIct from "@/components/company/companyTable/companyTable";
import React, { useState } from "react";

const CompanyTable = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    return (
    <div>
      <CompanyTableIct 
      page={page}
      limit={limit}
      setPage={setPage}
      setLimit={setLimit}
      />
    </div>
  );
};

export default CompanyTable;
