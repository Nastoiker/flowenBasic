import {call, put, takeEvery} from "redux-saga/effects";
import {loginSuccess} from "../slices/auth.slice";
import {ProductState} from "../product.slice";
import {DOMEN} from "../../../domen.api";
import {userState} from "../slices/user.slice";

function* login(action: any) {
    try {
        const { email, password } = action.payload;
        const response: Promise<userState> = yield call(() => fetch( DOMEN.user.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        }));
        const token:userState = yield response.json();
        yield put(loginSuccess(token));
    } catch(error) {

    }
}
function* authSaga() {
    yield takeEvery('auth/loginFetch', login);
}
export default authSaga;
