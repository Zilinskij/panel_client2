import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createUserModal: false,
};

const companySlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalState: (state, action) => {
      state.createUserModal = action.payload;
    },
  },
});

export const { setModalState } = companySlice.actions;
export default companySlice.reducer;
