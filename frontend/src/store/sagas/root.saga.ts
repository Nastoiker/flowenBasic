import { all } from "redux-saga/effects";
import BrandSaga from "./brands.saga";
import phonesCatSaga from "./phones.saga";
import registerSaga from "./register.saga";
import authSaga from "./auth.saga";
import userSaga from "./user.saga";
import BasketSaga from "./basket.saga";

export function* rootSaga() {
  yield all([
    BrandSaga(),
    phonesCatSaga(),
    registerSaga(),
    authSaga(),
    userSaga(),
    BasketSaga(),
  ]);
}
