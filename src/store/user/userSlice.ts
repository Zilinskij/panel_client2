import instance from "@/lib/axios";
import { Login } from "@/types/login";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  token: string | null;
  role: string;
}

export const forLogin = createAsyncThunk<any, Login, { rejectValue: string }>(
  "user-admin/login",
  async (form, { rejectWithValue }) => {
    try {
      const res = await instance.post("/auth/login", form);
      return res.data;
    } catch (error: any) {
      return rejectWithValue("Помилка при авторизації");
    }
  }
);

const initialState: UserState = {
  name: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  token: null,
  role: '',
};

export const loginPage = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forLogin.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(forLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
      })
      .addCase(forLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Невідома помилка";
      });
  },
});

export default loginPage.reducer;
