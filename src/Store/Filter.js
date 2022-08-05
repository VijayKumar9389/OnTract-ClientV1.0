import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'filter',
    initialState: { value: 0 },
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        }
    }
});

export const {change} = filterSlice.actions;

export default filterSlice.reducer;