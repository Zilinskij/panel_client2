"use client";

import CompanyList from "@/components/company/companyList";
// import EditCompany from "@/components/company/editCompany";

export default function AdminPage() {
  return (
    <div className="p-6">
      <h2 className="text-red-400">Панель адміністратора</h2>
      <CompanyList />
      {/* <EditCompany id="60" initialName="" /> */}
    </div>
  );
}
