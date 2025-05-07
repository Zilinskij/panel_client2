"use client";

import CompanyList from "@/components/company/tableCompanyList";
import CreateCompany from "@/components/company/createCompanyList";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getMe } from "@/store/user/userSlice";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import { Toaster } from "@/components/ui/sonner";

export default function AdminPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  console.log("name admin page", user?.name);

  const handleCreate = () => {};
  const handleClose = () => {
    setShowCreateForm(false);
  };

  console.log(user, "admin");

  useEffect(() => {
    dispatch(getMe());
  }, []);
  useEffect(() => {
    socket.connect();
  }, []);
  useEffect(() => {
    if (!user?.id) {
      router.replace("/login");
    }
  }, []);

  if (!user?.id) {
    return null;
  }

  return (
    <div className="px-5">
      <div>
        <div
          className="flex justify-end
       mx-6"
        >
          <div className="mx-4">
            <Button
              variant={"outline"}
              className="border-green-400"
              onClick={() => setShowCreateForm(true)}
            >
              <CirclePlus />
              Створити компанію
            </Button>
          </div>
        </div>
        <CompanyList />
        {showCreateForm && (
          <CreateCompany
            onCreate={handleCreate}
            onClose={handleClose}
            open={showCreateForm}
            onOpenChange={setShowCreateForm}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
}
