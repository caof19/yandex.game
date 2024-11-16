import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";

export const reducer = combineReducers({ auth: authSlice });

const store = configureStore({
    reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
