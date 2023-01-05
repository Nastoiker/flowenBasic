import {configureStore} from "@reduxjs/toolkit";

import productSlice from "./product.slice";
import firstCategorySlice from './firstCategory.slice';
import secondCategorySlice from './Second.slice';


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const store = configureStore({
    reducer: {
        product: productSlice,
        firstCategory: firstCategorySlice,
        secondCategory: secondCategorySlice,
    },
});

