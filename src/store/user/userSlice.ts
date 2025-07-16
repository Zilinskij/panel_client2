/* eslint-disable @typescript-eslint/no-unused-vars */
import instance from "@/lib/axios";
import { Login } from "@/types/login";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../enums/status";
import { UserIst } from "@/types/user";

interface User {
  id: number;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  role: string;
  name?: string;
}

interface UserState {
  currentUser: User | null;
  status: Status;
  error: string | null;
  name: string;
  succesMessage: string;
  users: UserIst[];
  isLoading: boolean;
}

export type DbUser = UserIst;

export interface IUserCredentials {
  email: string;
  password: string;
}

const initialState: UserState = {
  currentUser: null,
  status: Status.IDLE,
  error: null,
  name: "",
  succesMessage: "",
  users: [],
  isLoading: false,
};

export const fetchUsers = createAsyncThunk<
  DbUser[],
  void,
  { rejectValue: string }
>("fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get("/users");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const users = response.data.map(({ password_hash, ...res }: any) => res);
    return users;
  } catch (error) {
    return rejectWithValue("Помилка отримання даних (users)");
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const forLogin = createAsyncThunk<any, Login, { rejectValue: string }>(
  "auth/login",
  async (form, { rejectWithValue }) => {
    try {
      const res = await instance.post("/auth/login", form);
      if (res.data.id) {
        return res.data;
      }
      if (res.data.firstCheck.error_message) {
        return res.data.firstCheck;
      }
      if (res.status === 200) {
        return res.status;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return rejectWithValue("Помилка при авторизації");
    }
  }
);
export const getMe = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get("/auth/getme");
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return rejectWithValue("Помилка при авторизації");
    }
  }
);

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forLogin.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(forLogin.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.currentUser = action.payload;
        state.succesMessage = "Авторизація успішна!";
      })
      .addCase(forLogin.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload ?? "Невідома помилка";
      })
      .addCase(getMe.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.currentUser = action.payload;
        state.isLoading = false
      })
      .addCase(getMe.rejected, (state) => {
        state.status = Status.FAILED;
        state.isLoading = false
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = Status.LOADING;
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка невідома";
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
