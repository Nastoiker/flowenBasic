import {createSlice} from "@reduxjs/toolkit";
import {userSlice} from "./user.slice";
import { SmartPhone } from "../../../interfaces/product.interfaces";
interface SerchState {
    search: string;
    filters: string[];
    founded: SmartPhone[];
    currentBrand: string;
    currentSecondCategory: string;
    isFound: boolean;
}
const initialState:SerchState = {
    search: '',
    isFound: true,
};
const searchSlice = createSlice({
    name: 'phones',
    initialState,
    reducers: {
        search: (state, { payload}) => {
          state.founded = payload.phones.name.includes(payload.name);
          if(state.search.)
        },
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