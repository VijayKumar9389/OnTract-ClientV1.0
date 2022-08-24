import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        value: false,
        location: {
            province: null,
            city: null,
            cities: []
        },
        search: {
            type: 0,
            txt: ''
        }
    },

    reducers: {
        toggle: (state, action) => {
            state.value = action.payload;
        },
        setProvince: (state, action) => {
            state.location = action.payload;
        },
        setSearch: (state, action) => {
            state.search.txt = action.payload;
        },
        setSearchType: (state, action) => {
            state.search.type = action.payload;
        },
        clearSearch: (state) => {
            state.search.txt = '';
        },
    }
});

export const { toggle, setProvince, setSearchType, setSearch, clearSearch } = filterSlice.actions;

export default filterSlice.reducer;