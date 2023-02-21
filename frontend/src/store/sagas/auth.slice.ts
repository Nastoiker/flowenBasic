import {call, put, takeEvery} from "redux-saga/effects";
import {loginSuccess} from "../slices/auth.slice";
import {ProductState} from "../product.slice";

function* login(action) {
    try {
        const { email, password } = action.payload;
        const response: Promise<ProductState> = yield call((email, password) => fetch( 'http://localhost:8000/product/'), email, password);
        const token = response.data.token;
        yield put(loginSuccess(token));
    } catch(error) {

    }
}
function* auth() {
    yield takeEvery('auth/login', login);
}
export default auth;
