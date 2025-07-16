import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistConfig } from "./percsistConfig";
import { rootReducer } from "./rootReducer";

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {

  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    });
  }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
