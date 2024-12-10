import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    theme: string;
};

const initialState: TInitialState = {
    theme: "light",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<string>) {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
