import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {DOMEN} from "../../domen.api";

export interface FirstCategory {
    id: string,
    name: string,
    alias: string,
}
export interface CategoryState {
    category: FirstCategory[],
    currentCategory?: FirstCategory,
    pending: boolean,
    error: boolean,
}
const initialState:CategoryState = {
    category: [{id: '123', name: 'sadasdsa', alias: 'sdasdas'}],
    pending: false,
    error: false,
};
export const getFirstCategory = createAsyncThunk<FirstCategory[], undefined, {rejectValue: string}>('firstCategory', async (_, {rejectWithValue }) => {
    const response = await fetch(DOMEN.product.getFirstCategory);
    if(!response) {
        console.log(`Not found`);

        return rejectWithValue('Not found');
    }
    if(!response.ok) {
        console.log(`SERVER ERROR 500`);
        return rejectWithValue('SERVER ERROR 500');
    }
    const data =  await response.json();
    console.log(data);
    // await new Promise((resolve) => setTimeout(() => resolve(''),1000));
    return data;
});
const firstCategorySlice = createSlice({
    name: 'firstCategory',
    initialState,
    reducers: {
        setCurrentCategory:(state, {  payload }) =>{
            state.currentCategory = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getFirstCategory.pending, (state) => {
                state.pending = true;
            }
        )
            .addCase( getFirstCategory.fulfilled, (state, { payload }) => {
                state.pending = false;
                state.category = payload;
            })
            .addCase(getFirstCategory.rejected, (state) => {
                state.pending = false;
                state.error = true;
            });

    },
});
export default firstCategorySlice.reducer;