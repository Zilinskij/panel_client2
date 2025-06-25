import instance from "@/lib/axios";
import { TranslateTableData } from "@/types/translateTable";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../enums/status";

interface ModalsState {
  createUserModal: boolean;
  updateTranslateModal: boolean;
  newEditModal: boolean;
  updateKeyModal: boolean;
  deleteValueModal: boolean;
  searchKeyModal: boolean;
  selectedTranslateValue: TranslateTableData | null;
  status: Status;
}

const initialState: ModalsState = {
  createUserModal: false,
  updateTranslateModal: false,
  newEditModal: false,
  updateKeyModal: false,
  deleteValueModal: false,
  selectedTranslateValue: null,
  searchKeyModal: false,
  status: Status.IDLE,
};

export const updateTranslate = createAsyncThunk(
  "modals/updateTranslate",
  async (updateData: TranslateTableData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/translate/edit", updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Невідома помилка");
    }
  }
);

const companySlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalState: (state, action) => {
      state.createUserModal = action.payload;
    },
    toggleUpdateTranslateModal: (state) => {
      state.updateTranslateModal = !state.updateTranslateModal;
    },
    toggleCreateModal: (state) => {
      state.newEditModal = !state.newEditModal;
    },
    toggleEditKeyModal: (state) => {
      state.updateKeyModal = !state.updateKeyModal;
    },
    toggleDeleteValueModal: (state) => {
      state.deleteValueModal = !state.deleteValueModal;
    },
    setTranslateValue: (state, action: PayloadAction<TranslateTableData>) => {
      state.selectedTranslateValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTranslate.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        updateTranslate.fulfilled,
        (state, action: PayloadAction<TranslateTableData>) => {
          state.status = Status.SUCCESS;
          if (
            state.selectedTranslateValue &&
            state.selectedTranslateValue.id === action.payload.id
          ) {
            state.selectedTranslateValue.ids = action.payload.ids;
            state.selectedTranslateValue.expr = action.payload.expr;
            state.selectedTranslateValue.keystr = action.payload.keystr;
            state.updateTranslateModal = false;
          }
        }
      )
      .addCase(updateTranslate.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const {
  setModalState,
  toggleUpdateTranslateModal,
  toggleCreateModal,
  setTranslateValue,
  toggleEditKeyModal,
  toggleDeleteValueModal,
} = companySlice.actions;
export default companySlice.reducer;
