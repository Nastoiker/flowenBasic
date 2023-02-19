import {createSlice} from "@reduxjs/toolkit";
import {ProductState} from "../product.slice";
import {ModelDevice, ProductModel} from "../../../interfaces/product.interfaces";

interface StatePhones {
    phones: ProductModel[];
    currentModel?: ModelDevice[];
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
        setCurrentModel: (state, {payload}) => {
            state.currentModel = payload;
        }
    },
});
export const { getPhonesFetch, getPhonesFailure, getPhonesSuccess } = phonesSlice.actions;
export default phonesSlice.reducer;