import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    value: false,
    contacted: null,
    attempted: null,
    location: {
        province: null,
        city: null,
        cities: []
    },
    search: {
        type: 0,
        txt: ''
    },
    stakeholder: 0
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialStateValue,

    reducers: {
        toggle: (state, action) => {
            state.value = action.payload;
        },
        setProvince: (state, action) => {
            state.location.province = action.payload;
        },
        setCity: (state, action) => {
            state.location.city = action.payload;
        },
        setSearch: (state, action) => {
            state.search.txt = action.payload;
        },
        setSearchType: (state, action) => {
            state.search.type = action.payload;
        },
        setStakeholderType: (state, action) => {
            state.stakeholder = action.payload;
        },
        setAttempted: (state, action) => {
            state.attempted = action.payload;
        },
        setContacted: (state, action) => {
            state.contacted = action.payload;
        },
        clearSearch: (state) => {
            state.search.txt = '';
        },
        changeLocation: (state, action) => {
            state.location = action.payload;
            window.scrollTo(0, 0);
        },
        clearLocation: (state) => {
            state.location = { province: "", city: "", cityList: [] };
            window.scrollTo(0, 0);
        },
        clear: (state) => {
            state = initialStateValue;
            window.scrollTo(0, 0);
        },
    }
});

export const { toggle, clear, setAttempted, setContacted, setProvince, setCity, setSearchType, setStakeholderType, setSearch, changeLocation, clearSearch, clearLocation } = filterSlice.actions;

export default filterSlice.reducer;