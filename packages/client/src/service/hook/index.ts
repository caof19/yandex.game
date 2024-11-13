import { AppDispatch, RootState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
    const { isLogged } = useAppSelector((state) => state.auth);
    return isLogged;
};
export const useUsername = () => {
    const login = useAppSelector((state) => state.auth.user?.login);
    return login;
};
