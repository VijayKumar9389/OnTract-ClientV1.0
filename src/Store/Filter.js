import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    value: false,
    contacted: null,
    attempted: null,
    tracts: null,
    
    route: "",
    province: "",
    city: "",
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
        toggle: (state) => {
            state.value = !state.value;
        },
        setProvince: (state, action) => {
            state.province = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setSearch: (state, action) => {
            state.search.txt = action.payload;
        },
        setSearchType: (state, action) => {
            state.search.type = action.payload;
        },
        setRoute: (state, action) => {
            state.route = action.payload;
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
            return initialStateValue;
        },
        export: (state, action) => {
            
        }
    }
});

export const { toggle, clear, setAttempted, setContacted, setProvince, setCity, setSearchType, setRoute, setStakeholderType, setSearch, changeLocation, clearSearch, clearLocation } = filterSlice.actions;

export default filterSlice.reducer;