import {all} from "redux-saga/effects";
import BrandSaga from "./brands.saga";
import phonesCatSaga from "./phones.saga";

export function* rootSaga() {
    yield all([BrandSaga(), phonesCatSaga()]);
}