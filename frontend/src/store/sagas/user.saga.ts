import {call, put, takeEvery} from "redux-saga/effects";
import {loginSuccess} from "../slices/auth.slice";
import {ProductState} from "../product.slice";
import {registerSuccess, RegState} from "../slices/register.slice";
import {DOMEN} from "../../../domen.api";

function* WatchUserSaga() {
    try {
        const token = localStorage.getItem('token');
        console.log( 'action' + email);
        console.log(JSON.stringify(action.payload));
        const response: Promise<RegState> = yield call(() => fetch( DOMEN.user.register, { method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        }));
        const token = response.data.token;
        yield put(registerSuccess(token));
    } catch(error) {

    }
}
function* userSaga() {
    yield takeEvery('user/getUserFetch', WatchUserSaga);
}
export default registerSaga;
