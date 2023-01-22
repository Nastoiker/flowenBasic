import { takeEvery, put, call } from 'redux-saga/effects'
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const fetchData = createAsyncThunk('users/fetchData', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
})
export default function* rootSaga() {
    console.log('sdasd');
    yield all([watchSaga()])
}
export function* watchSaga() {
    yield takeEvery('users/fetchData', function* (action) {
        try {
            const data = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
            yield put(fetchData.fulfilled(data))
        } catch (e) {
            yield put(fetchData.rejected(e))
        }
    })
}
export function* workerSaga() {

}