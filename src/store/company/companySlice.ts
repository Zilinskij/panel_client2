import instance from "@/lib/axios";
import { InitialValuesProps } from "@/types/companyTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CompanyState {
  companies: InitialValuesProps[];
  loading: boolean;
  error: null | string;
}

export const createCompany = createAsyncThunk<
  InitialValuesProps,
  InitialValuesProps,
  { rejectValue: string }
>(
  "coppany/createcompany",
  async (value: InitialValuesProps, { rejectWithValue }) => {
    try {
      const res = await instance.post("/company", value);
      return res.data;
    } catch (error: any) {
      return rejectWithValue("Помилка при створенні (у slice)");
    }
  }
);

const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null as string | null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Невідома помилка";
      });
  },
});

export default companySlice.reducer;
