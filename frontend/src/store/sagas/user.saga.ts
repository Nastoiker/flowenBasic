import {call, put, takeEvery} from "redux-saga/effects";
import {loginSuccess} from "../slices/auth.slice";
import {ProductState} from "../product.slice";
import {registerSuccess, RegState} from "../slices/register.slice";
import {DOMEN} from "../../../domen.api";
import {getUserFetch, getUserSuccess, userState} from "../slices/user.slice";
function* WatchEditAddress(action: any) {
    const token = localStorage.getItem('token');
    if(!token) return;
    try {
        const response: Promise<userState> = yield call(() => fetch( DOMEN.user.editAddress, { method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(action.payload),
        }));
        const user:userState[] = yield response.json();
        yield put(getUserFetch());
    } catch(error) {

    }
}
function* UpdateInfo(action: any) {
    const token = localStorage.getItem('token');
    if(!token) return;
    try {
        const response: Promise<userState> = yield call(() => fetch( DOMEN.user.editProfile, { method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(action.payload),
        }));
        const user:userState[] = yield response.json();
        yield put(getUserFetch());
    } catch(error) {

    }
}
function* WatchCreateAddress(action: any) {
    const token = localStorage.getItem('token');
    if(!token) return;
    try {
        const response: Promise<userState> = yield call(() => fetch( DOMEN.user.createAddress, { method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(action.payload),
        }));
        const user:userState[] = yield response.json();
        yield put(getUserFetch());
    } catch(error) {

    }
}
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
    yield takeEvery('user/editAddress', WatchEditAddress);
    yield takeEvery('user/createAddress', WatchCreateAddress);
    yield takeEvery('user/editProfile', UpdateInfo);

}
export default userSaga;
