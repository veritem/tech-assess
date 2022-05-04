import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  // middleware: () => {}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
