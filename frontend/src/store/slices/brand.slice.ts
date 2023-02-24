import {createSlice} from "@reduxjs/toolkit";
import {Brand} from "../../../interfaces/product.interfaces";
export  interface brandsState {
    brands: Brand[],
    isLoading: boolean,
}
const initialState:brandsState = {
    brands: [],
    isLoading: false,
};
const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        getBrandsFetch: (state) => {
            state.isLoading = true;
        },
        getBrandsFailure: (state) => {
            state.isLoading = false;
        },
        getBrandsSuccess: (state, action) => {
            state.brands = action.payload;
            state.isLoading = false;
        },
    },
});
export const { getBrandsFetch, getBrandsFailure, getBrandsSuccess } = brandSlice.actions;
export default brandSlice.reducer;