import {call, put, takeEvery} from "redux-saga/effects";
import {loginSuccess} from "../slices/auth.slice";
import {ProductState} from "../product.slice";
import {registerSuccess, RegState} from "../slices/register.slice";
import {DOMEN} from "../../../domen.api";
import {getUserSuccess, userState} from "../slices/user.slice";

function* WatchUserSaga() {
    const token = localStorage.getItem('token');
    if(!token) return;
    try {
        const response: Promise<userState> = yield call(() => fetch( DOMEN.user.getInfoAfterAuth, { method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }));
        const user:userState[] = yield response.json();
        yield put(getUserSuccess(user));
    } catch(error) {

    }
}
function* userSaga() {
    yield takeEvery('user/getUserFetch', WatchUserSaga);
}
export default userSaga;
