import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
  // 如果你需要在開發環境中禁用 Redux DevTools
  // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
