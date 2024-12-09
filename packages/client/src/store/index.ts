import {
    useDispatch as useDispatchBase,
    useSelector as useSelectorBase,
    TypedUseSelectorHook,
    useStore as useStoreBase,
} from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import themeSlice from "./slice/theme";

declare global {
    interface Window {
        APP_INITIAL_STATE: RootState;
    }
}

export const reducer = combineReducers({ auth: authSlice, theme: themeSlice });

export const store = configureStore({
    reducer,
    preloadedState:
        typeof window === "undefined" ? undefined : window.APP_INITIAL_STATE,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useDispatchBase;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
export const useStore: () => typeof store = useStoreBase;
