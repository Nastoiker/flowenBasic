import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface SecondCategory {
    id: string,
    name: string,
    alias: string,
    firstLevelId: string
}
export interface SecondCategoryState {
    category: SecondCategory[],
    currentCategory?: '',
    pending: boolean,
    error: boolean,
}
const initialState:SecondCategoryState = {
    category: [],
    currentCategory: '',
    pending: false,
    error: false,
};
export const getSecondCategory = createAsyncThunk<SecondCategory[], string, {rejectValue: string}>('Product/getByCategory', async (id, {rejectWithValue}) => {
    const data = {'firstLevelId': id};
    const response = await fetch('http://localhost:8000/product/byCategory', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify(data),
    });
    if(!response) {
        return rejectWithValue('Not found');
    }
    if(!response.ok) {
        return rejectWithValue('SERVER ERROR 500');
    }
    console.log(`response`);
    const res =  response.json();
    return res;
});
export const secondCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        SetCurrentCategory: (state, {  payload }) => {
            state.currentCategory = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSecondCategory.pending, (state) => {
                state.pending = true;
            })
            .addCase( getSecondCategory.fulfilled, (state, { payload }) => {
                state.pending = false;
                state.category = payload;
            })
            .addCase(getSecondCategory.rejected, (state) => {
                state.pending = false;
                state.error = true;
            });
    },
});
export const {SetCurrentCategory } = secondCategorySlice.actions;
export default secondCategorySlice.reducer;