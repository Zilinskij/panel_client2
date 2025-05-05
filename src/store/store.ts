import { configureStore } from "@reduxjs/toolkit";

import modalsReducer from "./modals/modalsSlice";
import userReduser from "./user/userSlice";
import clientsReduser from "./company/companyEdit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // ASYNC
      companyClients: clientsReduser,
      user: userReduser,
      // LOCAL
      modals: modalsReducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
