import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { txt: '' }

export const searchSlice = createSlice({
    name: 'search',
    initialState: { value: initialStateValue },
    reducers: {
        change: (state, action) => {
            state.value = action.payload;
        },
        clear: (state) => {
            state.value = initialStateValue;
        },
    }
});

export const { change, clear } = searchSlice.actions;

export default searchSlice.reducer;