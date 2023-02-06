import {createSlice} from "@reduxjs/toolkit";
interface SerchState {
    search: string;
    filters: string[];
    currentBrand: string;
    currentSecondCategory: string;
}
const initialState:SerchState = {
    search: '',
    isLoading: true,
};
const searchSlice = createSlice({
    name: 'phones',
    initialState,
    reducers: {
        getPhonesFetch: (state) => {
            state.isLoading = true;
        },
        getPhonesFailure: (state) => {
            state.isLoading = false;
        },
        getPhonesSuccess: (state, action) => {
            state.phones = action.payload;
            state.isLoading = false;
        },
    },
});