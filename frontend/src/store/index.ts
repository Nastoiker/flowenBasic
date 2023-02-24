import {applyMiddleware, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

import productSlice from "./product.slice";
import firstCategorySlice from './firstCategory.slice';
import secondCategorySlice from './SecondCategory.slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import createSagaMiddleware from 'redux-saga';
import phonesSlice from "./slices/phones.slices";
import phonesCatSaga from "./sagas/phones.saga";
import brandSlice from "./slices/brand.slice";
import BrandSaga from "./sagas/brands.saga";
import {rootSaga} from "./sagas/root.saga";
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const sagaMiddleware = createSagaMiddleware();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
export const store = configureStore({
    reducer: {
        product: productSlice,
        firstCategory: firstCategorySlice,
        secondCategory: secondCategorySlice,
        phone: phonesSlice,
        brands: brandSlice,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
