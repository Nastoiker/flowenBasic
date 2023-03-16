import {createSlice} from "@reduxjs/toolkit";
import {ProductState} from "../product.slice";
import {ModelDevice, ProductModel, SmartPhone} from "../../../interfaces/product.interfaces";
import {WritableDraft} from "immer/src/types/types-external";

interface StatePhones {
    phones: ProductModel[];
    staticPhones: ProductModel[]
    currentModel?: ModelDevice;
    filtered: ProductModel[];
    isLoading: boolean;
}
const initialState:StatePhones = {
    phones: localStorage.getItem('phones'),
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
            if(!state.staticPhones)  state.staticPhones = action.payload;
            state.filtered =  action.payload;
            state.phones = action.payload;
            state.isLoading = false;
        },
        setCurrentModel: (state, {payload}) => {
            let  model;
            for(const phone of state.staticPhones) {
                if (phone.id === payload) {
                    console.log(phone + 'mmmm');
                    state.currentModel = phone;
                }
            }
        },
        getWithAction: (state, {payload}) => {
            state.filtered = payload.filtered.map( p => p.price < p.oldPrice);
        },
        getByPrice: (state, {payload}) => {
            // @ts-ignore
            const models:ProductModel[] = [];
            for( const model of state.staticPhones) {
                const thisModel = model;
                const phones: SmartPhone[] = [];
                for(const phone of model.product) {
                    if(phone.price > payload.minPrice && phone.price < payload.maxPrice ) {
                        phones.push(phone);
                    }
                    console.log(phone);
                }
                thisModel.product = phones;
                console.log(phones);
                models.push(thisModel);
            }
            state.filtered = models;
        },
        // getPhonesByBrand: (state, {payload}) => {
        //     console.log(payload);
        //     const arr = state.phones.filter( p => p.brand.id === payload.id);
        //     console.log(arr);
        // }
    },
});
export const { getPhonesFetch, getPhonesFailure, getPhonesSuccess, setCurrentModel, getPhonesByBrand, getByPrice } = phonesSlice.actions;
export default phonesSlice.reducer;