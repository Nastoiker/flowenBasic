import {createSlice} from "@reduxjs/toolkit";
import {ProductModel} from "../../../interfaces/product.interfaces";
export interface StateCard {
    productId: string;
    orderId: string;
    userId: string;
    boughtProductId?: string | null;
    quantity: number;
    createdAt: string;
    isLoading: boolean;
}
const initialState: StateCard = {
    productId: '',
    orderId: '',
    userId: '',
    boughtProductId: '',
    quantity: 1,
    createdAt: '',
    isLoading: true,
};
const cardSlice = createSlice({
    name: 'cardSlice',
    initialState,
    reducers: {
        getPhonesFetch: (state) => {
            state.isLoading = true;
        },
        getPhonesFailure: (state) => {
            state.isLoading = false;
        },
        getPhonesSuccess: (state, action) => {
            state = action.payload;
            state.isLoading = false;
        },
    },
});