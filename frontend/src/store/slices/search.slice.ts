import {createSlice} from "@reduxjs/toolkit";
import {userSlice} from "./user.slice";
interface SerchState {
    search: string;
    filters: string[];
    currentBrand: string;
    currentSecondCategory: string;
    isLoading: boolean;
}
const initialState:SerchState = {
    search: '',
    isLoading: true,
};
const searchSlice = createSlice({
    name: 'phones',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        getPhonesFetchBySearch: (state) => {
            state.isLoading = false;
        },
        getPhonesFailureBySearch: (state) => {
            state.isLoading = false;
        },
        getPhonesSuccessBySearch: (state, action) => {
            state.isLoading = true;
        },
    },
});
export default searchSlice.reducer;