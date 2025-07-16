import instance from "@/lib/axios";
import {
  CompanyFields,
  CompanyTable,
  CreateCompany,
} from "@/types/companyTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../enums/status";

export type CompanyState = CompanyTable & {
  status: Status;
};

type CompanyListState = {
  company: CompanyState[];
  totalPages: number;
  actualLimit: number;
  actualPage: number;
  selectedCompany: CompanyTable | null;
  allFieldsCompany: CompanyFields[];
  status: Status;
  error: string | null;
};

const initialState: CompanyListState = {
  company: [],
  totalPages: 0,
  actualLimit: 10,
  actualPage: 1,
  selectedCompany: null,
  allFieldsCompany: [],
  status: Status.IDLE,
  error: null,
};

export const createCompany = createAsyncThunk<
  CompanyTable,
  CreateCompany,
  { rejectValue: string }
>("createNewCompany", async (objCreate, { rejectWithValue }) => {
  try {
    const result = await instance.post("/companyes/create", objCreate);
    return result.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue(
      "Помилка при створенні компанії (create new company)"
    );
  }
});

export const fetchCompany = createAsyncThunk<
  { data: CompanyState[]; totalPages: number },
  { limit: number; page: number },
  { rejectValue: string }
>("getAllCompany", async ({ limit, page }, { rejectWithValue }) => {
  try {
    const res = await instance.get(`/companyes?limit=${limit}&page=${page}`);
    return { data: res.data.data, totalPages: res.data.pagination.totalPages };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Помилка отримання даних (клієнтів)");
  }
});

// без підключення до пороцедури покищо!!
export const editCompany = createAsyncThunk<
  CompanyTable,
  CompanyTable,
  { rejectValue: string }
>("editCompany", async (company, { rejectWithValue }) => {
  try {
    const response = await instance.post(
      `/companyes/update/${company.id}`,
      company
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Помилка редагування даних компанії");
  }
});

export const selectCompanyFields = createAsyncThunk<
  CompanyFields[],
  void,
  { rejectValue: string }
>("select-all-company-fields", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get("/companyes/fields");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Помилка при перекладі");
  }
});

export const companiesIct = createSlice({
  name: "companiesIst",
  initialState,
  reducers: {
    setActualLimit: (state, action) => {
      state.actualLimit = action.payload;
    },
    setActualPage: (state, action) => {
      state.actualPage = action.payload;
    },
    setSelectedCompany: (state, action: PayloadAction<CompanyTable>) => {
      state.selectedCompany = action.payload;
    },
    clearSelectedCompany: (state) => {
      state.selectedCompany = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        const newCompany: CompanyState = {
          ...action.payload,
          status: Status.SUCCESS,
        };
        state.company.unshift(newCompany);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка при створенні програми";
      })
      .addCase(fetchCompany.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.totalPages = action.payload.totalPages;
        state.company = action.payload.data as CompanyState[];
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error =
          action.payload || "Помилка при отриманні значень програми";
      })
      .addCase(selectCompanyFields.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(selectCompanyFields.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.allFieldsCompany = action.payload;
      })
      .addCase(selectCompanyFields.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка отримання значень country";
      });
  },
});

export const {
  setActualLimit,
  setActualPage,
  setSelectedCompany,
  clearSelectedCompany,
} = companiesIct.actions;

export default companiesIct.reducer;
