import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "../features/todo-slice";

export const store = configureStore({
    reducer: {
        [todoSlice.reducerPath]: todoSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(todoSlice.middleware);
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
