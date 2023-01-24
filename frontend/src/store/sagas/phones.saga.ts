import {call, put, takeEvery} from "redux-saga/effects";
import axios, {AxiosResponse} from "axios";
import {ResponseGenerator} from "./index";
import {getPhonesSuccess} from "../slices/phones.slices";
import {ProductState} from "../product.slice";

// export function* watchSaga() {
//
// }
export function* workerPhonesSaga() {
    const data:AxiosResponse<ProductState[]> = yield call(() => axios.get( 'https://jsonplaceholder.typicode.com/posts'));
    // const formatProduct:ResponseGenerator = yield data.data;
    // const data:Promise<> = yield call(fetch('https://jsonplaceholder.typicode.com/posts'));
    const formatProduct:ProductState[] = yield data.data;
    console.log(formatProduct);
    yield put(getPhonesSuccess(formatProduct));
}
function* phonesCatSaga() {
    yield takeEvery('phones/getPhonesFetch', workerPhonesSaga);
}
export default  phonesCatSaga;