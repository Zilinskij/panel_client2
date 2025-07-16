import React from "react";
import TranslateModal from "./translate/TranslateModal";
import { UpdateKeyModal } from "./translate/updateKayModal";
import DeleteValueModal from "./translate/deleteValueModal";
import { NewEditModal } from "./translate/newEditModal";
import CreateCompanyModal from "./company/createCompanyModal";

const ModalsWrapper = () => {
  return (
    <>
      <TranslateModal />
      <UpdateKeyModal />
      <DeleteValueModal />
      <NewEditModal/>
      <CreateCompanyModal />
    </>
  );
};

export default ModalsWrapper;
