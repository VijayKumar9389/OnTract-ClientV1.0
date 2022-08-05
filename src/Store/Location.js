import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { province: "", city: "", cityList: [] }

export const locationSlice = createSlice({
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

export const { change, clear } = locationSlice.actions;

export default locationSlice.reducer;