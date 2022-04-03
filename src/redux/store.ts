import { configureStore, combineReducers } from "@reduxjs/toolkit";

import appReducer from "./appSlice";
import { appMiddle } from "./appMiddle";

const store = configureStore({
  reducer: combineReducers({
    appReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(appMiddle).concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
