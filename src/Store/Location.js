import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { user: "" }

export const userSlice = createSlice({
    name: "location",
    initialState: { value: initialStateValue },
    reducers: {
        change: (state, action) => {
            state.value = action.payload;
            window.scrollTo(0, 0);
        },
        clear: (state) => {
            state.value = initialStateValue;
            window.scrollTo(0, 0);
        },
    }
});

export const { change, clear } = userSlice.actions;

export default userSlice.reducer;