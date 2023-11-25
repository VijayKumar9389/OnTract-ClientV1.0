import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = {
    value: false,
    contacted: null,
    attempted: null,
    tracts: null,
    delivery: null,
    consultation: null,
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
        setConsultation: (state, action) => {
            state.consultation = action.payload;
        },
        setDelivery: (state, action) => {
            state.delivery = action.payload;
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

        hasStateChanged: (state) => {
            if (state === initialStateValue) {
                return false;
            } else {
                return true;
            }
        },
        
        export: (state, action) => {

        }
    }
});

export const { toggle, clear, setAttempted, setContacted, setProvince, setCity, setSearchType, setRoute, setStakeholderType, setSearch, setDelivery, setConsultation, changeLocation, clearSearch, clearLocation, hasStateChanged } = filterSlice.actions;

export default filterSlice.reducer;