import { TranslateTableData, TranslateTbl } from "@/types/translateTable";
import { Status } from "../enums/status";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from "@/lib/axios";
import { ColumnFilter } from "@tanstack/react-table";

export type Translate = TranslateTableData;

type Transl = {
  status: Status;
  error: string | null;
  tableData: Translate[];
  fieldsData: Translate[];
  selectedRow: Translate | null;
  selectedTbl: string;
  filteredTableData: Translate[];
  forUpdateTable: Translate[];
  answerStatus: string | null;
  allFieldsTbl: TranslateTbl[];
  keystr: string;
  ids: string;
  expr: string;
  lang: string;
};

type TranslateApiResponse =
  | { status: "ok"; data: Translate[] }
  | {
      status: "error";
      error_code: string;
      error_message: string;
      error_hint: string;
    };

const initialState: Transl = {
  tableData: [],
  fieldsData: [],
  filteredTableData: [],
  forUpdateTable: [],
  status: Status.IDLE,
  error: null,
  selectedRow: null,
  selectedTbl: '',
  answerStatus: null,
  allFieldsTbl: [],
  keystr: "",
  ids: "",
  expr: "",
  lang: "",
};

export const translateByKeyTbl = createAsyncThunk<
  Translate[],
  string,
  { rejectValue: string }
>("translate-by-key-tbl", async (tbl, { rejectWithValue }) => {
  try {
    const response = await instance.post("/translate/tbl-key", { tbl });
    const transl = response.data;
    return transl;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Помилка отримання даних (translate tbl-key)");
  }
});

export const serverFilterByKey = createAsyncThunk<
  Translate[],
  { filters: ColumnFilter; tbl: string },
  { rejectValue: string }
>("serverFilter", async ({ filters, tbl }, { rejectWithValue }) => {
  try {
    const response = await instance.post("/translate/filter", {
      filters,
      tbl,
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Помилка фільтрування даних");
  }
});

export const takeAllFields = createAsyncThunk<
  Translate[],
  string,
  { rejectValue: string }
>("allFields", async (value, { rejectWithValue }) => {
  try {
    const response = await instance.post("/translate/all-fields", { value });
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return [response.data];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Помилка отримання даних з усіх полів");
  }
});

export const translateByKey = createAsyncThunk<
  Translate[],
  { key: string; tbl: string },
  { rejectValue: string }
>("translByKey", async ({ key, tbl }, { rejectWithValue }) => {
  try {
    const result = await instance.get(`/translate/${tbl}/${key}`);
    return result.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Помилка отримання даних (translate by key)");
  }
});

export const updateKey = createAsyncThunk<
  Translate[],
  { oldKey: string; newKey: string },
  { rejectValue: string }
>("updateKey", async ({ oldKey, newKey }, { rejectWithValue }) => {
  try {
    const result = await instance.post(`/translateUpdKey`, { oldKey, newKey });
    return result.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Помилка отримання даних (translate by key)");
  }
});

export const addTranslate = createAsyncThunk<
  TranslateApiResponse,
  TranslateTableData,
  { rejectValue: string }
>(
  "modals/addTranslate",
  async (updateData: TranslateTableData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/translate/edit", updateData);
      return response.data as TranslateApiResponse;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Помилка при перекладі");
    }
  }
);

export const deleteTranslate = createAsyncThunk<
  TranslateApiResponse,
  TranslateTableData,
  { rejectValue: string }
>(
  "modals/deleteTranslate",
  async (updateData: TranslateTableData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/translate/delete", updateData);
      return response.data as TranslateApiResponse;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Помилка при перекладі");
    }
  }
);

export const selectTblFieldsAll = createAsyncThunk<
  TranslateTbl[],
  [],
  { rejectValue: string }
>("select-all-tbl-fields", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.post("/translate/tbl-fields");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Помилка при перекладі");
  }
});

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setSelectedRow(state, action: PayloadAction<Translate | null>) {
      state.selectedRow = action.payload;
    },
    setKeystr(state, action: PayloadAction<string>) {
      state.keystr = action.payload;
    },
    setCode(state, action: PayloadAction<string>) {
      state.ids = action.payload;
    },
    setExpr(state, action: PayloadAction<string>) {
      state.expr = action.payload;
    },
    setLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
    resetAnswerStatus: (state) => {
      state.answerStatus = null;
    },
    setFieldsData: (state, action: PayloadAction<Translate[]>) => {
      state.fieldsData = action.payload;
    },
    setSelectedTbl: (state, action: PayloadAction<string>) => {
      state.selectedTbl = action.payload;
    },
  },
  extraReducers: (builer) => {
    builer
      .addCase(translateByKeyTbl.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(translateByKeyTbl.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.tableData = action.payload;
      })
      .addCase(translateByKeyTbl.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка невідома";
      })
      .addCase(serverFilterByKey.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(serverFilterByKey.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.tableData = action.payload;
      })
      .addCase(serverFilterByKey.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка фільтрації";
      })
      .addCase(translateByKey.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(translateByKey.fulfilled, (state, action) => {
        state.filteredTableData = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(translateByKey.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка невідома";
      })
      .addCase(updateKey.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(updateKey.fulfilled, (state, action) => {
        state.filteredTableData = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(updateKey.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка невідома";
      })
      .addCase(addTranslate.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(addTranslate.fulfilled, (state, action) => {
        if (action.payload.status === "ok") {
          state.status = Status.SUCCESS;
          state.answerStatus = "ok";
          state.tableData = action.payload.data;
        } else {
          state.status = Status.FAILED;
          state.answerStatus = "error";
          state.error = action.payload.error_message || "Помилка з бази";
        }
      })
      .addCase(addTranslate.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка невідома";
      })

      .addCase(deleteTranslate.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(deleteTranslate.fulfilled, (state, action) => {
        if (action.payload.status === "ok") {
          state.status = Status.SUCCESS;
          state.answerStatus = "ok";
        } else {
          state.status = Status.FAILED;
          state.answerStatus = "error";
          state.error = action.payload.error_message || "Помилка з бази";
        }
      })
      .addCase(deleteTranslate.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка невідома";
      })

      .addCase(takeAllFields.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(takeAllFields.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.fieldsData = action.payload;
      })
      .addCase(takeAllFields.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка отримання всіх значень";
      })
      .addCase(selectTblFieldsAll.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(selectTblFieldsAll.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.allFieldsTbl = action.payload;
      })
      .addCase(selectTblFieldsAll.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Помилка отримання значень всіх полів";
      });
  },
});

export const {
  setKeystr,
  setCode,
  setExpr,
  setSelectedRow,
  setLang,
  resetAnswerStatus,
  setFieldsData,
  setSelectedTbl,
} = translateSlice.actions;

export default translateSlice.reducer;
