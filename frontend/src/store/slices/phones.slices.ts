import {createSlice} from "@reduxjs/toolkit";
import {ProductState} from "../product.slice";
import {ModelDevice, ProductModel} from "../../../interfaces/product.interfaces";
import {WritableDraft} from "immer/src/types/types-external";

interface StatePhones {
    phones: ProductModel[];
    currentModel?: ModelDevice;
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
            let  model;
            for(const phone of state.phones) {
                if (phone.id === payload) {
                    console.log(phone + 'mmmm');
                    state.currentModel = phone;
                }
            }
        }
    },
});
export const { getPhonesFetch, getPhonesFailure, getPhonesSuccess, setCurrentModel } = phonesSlice.actions;
export default phonesSlice.reducer;