import { configureStore } from "@reduxjs/toolkit";

import modalsReducer from "./modals/modalsSlice";
import userReducer from "./user/userSlice";
import clientsReducer from "./company/companyEdit";
import translateReducer from "./translate/translateSlice";
import companiesReducer from "./companies/companies";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // ASYNC
      clients: clientsReducer,
      user: userReducer,
      translate: translateReducer,
      companies: companiesReducer,
      // LOCAL
      modals: modalsReducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
