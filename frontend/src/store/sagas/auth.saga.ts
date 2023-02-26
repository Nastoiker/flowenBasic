import {call, put, takeEvery} from "redux-saga/effects";
import {loginSuccess} from "../slices/auth.slice";
import {ProductState} from "../product.slice";
import {DOMEN} from "../../../domen.api";

function* login(action: any) {
    try {
        const { email, password } = action.payload;
        const response: Promise<ProductState> = yield call((email, password) => fetch( DOMEN.user.login), email, password);
        const token = response.data.token;
        yield put(loginSuccess(token));
    } catch(error) {

    }
}
function* auth() {
    yield takeEvery('auth/loginFetch', login);
}
export default auth;
