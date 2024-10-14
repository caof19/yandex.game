import { User } from "@/service/api/user";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    user: User | null;
    isLogged: boolean;
};

const initialState: TInitialState = {
    user: null,
    isLogged: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.isLogged = true;
            console.log("Action", action.payload);
            console.log("User from state ", state.user);
            console.log("Logined ", state.isLogged);
        },
    },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
