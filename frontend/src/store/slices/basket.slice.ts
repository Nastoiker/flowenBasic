import {createSlice} from "@reduxjs/toolkit";
import {ProductModel, Rating} from "../../../interfaces/product.interfaces";
import {userSlice} from "./user.slice";
 export interface basketState {
     basket: Basket[],
     isLoading: boolean,
}

export interface Basket {
    id: string;
    buying: boolean;
    productId: string;
    userId: string;
    boughtProductId?: any;
    quantity: number;
    createdAt: Date;
    product: Product;

}
 interface Product {
    id: string;
    alias: string;
    name: string;
    price: number;
    oldPrice: number;
    TagId: string;
    brandId: string;
    Color: string;
    ColorAlias: string;
    Description: string;
    image: string;
    Memory: number;
    Ram: number;
    modelDeviceId: string;
    quantity: number;
 }
const initialState: basketState = {
    basket: [],
    isLoading: false,
};
const cardSlice = createSlice({
    name: 'cardSlice',
    initialState,
    reducers: {
        getBasketFetch: (state) => {
            state.isLoading = true;
        },
        getBasketFailure: (state) => {
            state.isLoading = false;
        },
        getBasketSuccess: (state, action) => {
            state.basket = action.payload;
            state.isLoading = false;
        },
        deleteBasket: (state, action) => {
            state.basket = state.basket.filter( m => m.id !== action.payload);
        },
        editBasketFetch: (state, action) => {
            console.log(1);
            console.log(action);
        }
    },
});
export const { getBasketFetch, getBasketFailure, getBasketSuccess, editBasketFetch, deleteBasket } = cardSlice.actions;
export default cardSlice.reducer;