import { takeEvery, put, call, all } from "redux-saga/effects";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import phonesCatSaga from "./phones.saga";
export const fetchData = createAsyncThunk("users/fetchData", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});
export default function* rootSaga() {
  yield all([phonesCatSaga()]);
}
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
// type WhatYouYield="foo";
// type WhatYouReturn="bar";
// type WhatYouAccept="baz";
// // : Generator<
// // WhatYouYield,
// //     WhatYouReturn,
// // WhatYouAccept
// // >
// //return type for generator
// export function* watchSaga() {
//     const data:ResponseGenerator = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
//     const formatProduct:ResponseGenerator = yield data.data;
//     yield put(formatProduct.data);
// }
// export function* workerSaga() {
//
// }
// export function* phonesCatSaga() {
//     yield takeEvery('')
// }
