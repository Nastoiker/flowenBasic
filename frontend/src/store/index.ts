import {configureStore} from "@reduxjs/toolkit";

import productSlice from "./product.slice";
import firstCategorySlice from './firstCategory.slice';
import secondCategorySlice from './SecondCategory.slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
export const store = configureStore({
    reducer: {
        product: productSlice,
        firstCategory: firstCategorySlice,
        secondCategory: secondCategorySlice,
    },
});

