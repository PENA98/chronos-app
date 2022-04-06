import { configureStore, combineReducers } from "@reduxjs/toolkit";

import appReducer from "./appSlice";
import { appMiddle } from "./appMiddle";
import authReducer from "./authSlice";
import { authMiddle } from "./authMiddle";

const store = configureStore({
  reducer: combineReducers({
    appReducer,
    authReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      .prepend(appMiddle)
      .prepend(authMiddle)
      .concat()
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
