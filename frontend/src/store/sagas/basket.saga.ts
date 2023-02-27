import {call, put, takeEvery} from "redux-saga/effects";
import {loginSuccess} from "../slices/auth.slice";
import {DOMEN} from "../../../domen.api";
import {StateCard} from "../slices/basket.slice";

function* WatchBasketSaga() {
    const tokenUser = localStorage.getItem('token');
    try {
        const response: Promise<StateCard> = yield call((email, password) => fetch( DOMEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenUser;
            },
        }));
        const token = response.data.token;
        yield put(loginSuccess(token));
    } catch(error) {

    }
}
function* BasketSaga() {
    yield takeEvery('auth/loginFetch', WatchBasketSaga);
}
export default BasketSaga;
