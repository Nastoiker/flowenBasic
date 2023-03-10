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
        };
        setSearch: (state, action) => {
            state.search = action.payload
        },
        getPhonesFetchBySearch: (state) => {
            state.isFound = false;
        },
        getPhonesFailureBySearch: (state) => {
            state.isFound = false;
        },
        getPhonesSuccessBySearch: (state, action) => {
            state.isFound = true;
        },
    },
});
export const { setSearch, search, getPhonesFetchBySearch, getPhonesFailureBySearch, getPhonesSuccessBySearch} = searchSlice.actions;
export default searchSlice.reducer;