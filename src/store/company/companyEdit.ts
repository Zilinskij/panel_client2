/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ClientsIst } from "@/types/companyClients";
import { Status } from "../enums/status";
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import instance from "@/lib/axios";

export type Client = ClientsIst;

type ClientsState = {
  clients: Client[];
  status: Status;
  error: string | null;
  selectedClient: Client | null;
  totalPages: number;
};

const initialState: ClientsState = {
  clients: [],
  status: Status.IDLE,
  error: null,
  selectedClient: null,
  totalPages: 10,
};

export const fetchClients = createAsyncThunk<
  { data: Client[]; totalPages: number },
  { limit: number; page: number },
  { rejectValue: string }
>("fetchClients", async ({ limit, page }, { rejectWithValue }) => {
  try {
    const res = await instance.get(`/companyes?limit=${limit}&page=${page}`);
    return { data: res.data.data, totalPages: res.data.pagination.totalPages };
  } catch (error) {
    return rejectWithValue("Помилка отримання даних (клієнтів)");
  }
});

export const editClients = createAsyncThunk<
  Client,
  Client,
  { rejectValue: string }
>("editClients", async (company, { rejectWithValue }) => {
  try {
    const res = await instance.put(`/companyes/update/${company.kod}`, company);
    return res.data;
  } catch (error) {
    return rejectWithValue("Помилка редагування даних (клієнтів)");
  }
});

export const updateClientFromSocket = createAction<Client[]>(
  "companyClient/updateFromSocket"
);



export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setSelectedClient: (state, action: PayloadAction<Client>) => {
      state.selectedClient = action.payload;
    },
    clearSelectedClient: (state) => {
      state.selectedClient = null;
    },
    updateClientFromSocket: (state, action) => {
      state.clients = action.payload;
    },
    updateClient: (state, action) => {
      //   const myObject = state.clients.find(obj => obj.kod === action.payload.kod)
      // console.log('MY OBJECT', myObject);

      // if (myObject) {
      //   Object.assign(myObject,action.payload)
      // }

      //  state.clients.map(item =>{
      //  return item?.id === action.payload.id ? {...item, ...action.payload} : item
      // })

      const index = state.clients.findIndex(
        (obj) => obj.kod === action.payload.kod
      );
      if (index != -1) {
        state.clients[index] = { ...state.clients[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.clients = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload ?? null;
      })
      .addCase(editClients.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(editClients.fulfilled, (state, action) => {
        const updateClient = action.payload;
        const index = state.clients.findIndex(
          (client) => client.kod === updateClient.kod
        );
        if (index !== -1) {
          state.clients[index] = updateClient;
        }
      })
      .addCase(editClients.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload ?? null;
      });
  },
});

export const { setSelectedClient, clearSelectedClient, updateClient } =
  clientsSlice.actions;
export default clientsSlice.reducer;
