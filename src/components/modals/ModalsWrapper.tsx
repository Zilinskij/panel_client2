import React from "react";
import TranslateModal from "./translate/TranslateModal";
import { UpdateKeyModal } from "./translate/updateKayModal";
import DeleteValueModal from "./translate/deleteValueModal";

const ModalsWrapper = () => {
  return (
    <>
      <TranslateModal />
      <UpdateKeyModal />
      <DeleteValueModal />
    </>
  );
};

export default ModalsWrapper;
