import { CompanyFormValues } from "@/validations/company/companyZodSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CompanyFormValues = {
  company_name: "",
  id_country: 11,
  locality: "",
  edrpou: "",
};

const companyDraftSlice = createSlice({
  name: "company-draft",
  initialState,
  reducers: {
    setCompanyDraft: (
      state,
      action: PayloadAction<Partial<CompanyFormValues>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearCompanyDraft: () => initialState,
  },
});

export const { setCompanyDraft, clearCompanyDraft } = companyDraftSlice.actions;
export default companyDraftSlice.reducer;
