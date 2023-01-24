import {createSlice} from "@reduxjs/toolkit";
interface Phone {
    userId: number;
    id:     number;
    title:  string;
    body:   string;
}
interface StatePhones {
    phones: Phone[];
    isLoading: boolean;
}
const initialState:StatePhones = {
    phones: [],
    isLoading: true,
};
const phonesSlice = createSlice({
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
export const { getPhonesFetch, getPhonesFailure, getPhonesSuccess } = phonesSlice.actions;
export default phonesSlice.reducer;