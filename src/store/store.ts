import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./company/companySlice";
import modalsReducer from "./modals/modalsSlice";
import userReduser from "./user/userSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      // ASYNC
      company: companyReducer,
      user: userReduser,
      // LOCAL
      modals: modalsReducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
