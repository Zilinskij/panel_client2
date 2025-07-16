import { combineReducers } from "@reduxjs/toolkit";
import modalsReducer from "./modals/modalsSlice";
import userReducer from "./user/userSlice";
import clientsReducer from "./company/companyEdit";
import translateReducer from "./translate/translateSlice";
import companiesReducer from "./companyes/companyes";
import companyDraftReducer from "./companyesDraft/companyesDraftSlice";

export const rootReducer = combineReducers({
  // ASYNC
  clients: clientsReducer,
  user: userReducer,
  translate: translateReducer,
  companies: companiesReducer,
  // LOCAL
  modals: modalsReducer,
  companyDraft: companyDraftReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
