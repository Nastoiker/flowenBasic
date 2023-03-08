import {call, put, takeEvery} from "redux-saga/effects";
import {DOMEN} from "../../../domen.api";
import {basketState, getBasketFetch, getBasketSuccess} from "../slices/basket.slice";

function* WatchBasketSaga() {
    const tokenUser = localStorage.getItem('token');
    try {
        const response: Promise<basketState> = yield call(() => fetch( DOMEN.basket.getBasket, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenUser,
            },
        }));
        const basket:basketState = yield response.json();
        yield put(getBasketSuccess(basket));
    } catch(error) {

    }
}
function* WatchDeleteBasketSaga(action: any) {
    const tokenUser = localStorage.getItem('token');
    try {
        const res: Promise<basketState> =yield call(() => fetch(DOMEN.basket.deleteBasket, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenUser
            },
            method: 'POST',
            body: JSON.stringify({id: action.payload.id,}),
        }));
        yield put(getBasketFetch());
    } catch(error) {

    }
}
function* WatchEditCountBasketSaga(action: any) {
    console.log(action.payload);
    const tokenUser = localStorage.getItem('token');
    try {
        const res: Promise<basketState> = yield call(() => fetch(DOMEN.basket.editCount, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenUser
            },
            method: 'POST',
            body: JSON.stringify({basketId: action.payload.id, quantity: action.payload.quantity}),
        }));
        yield put(getBasketFetch());
    } catch(error) {

    }
}
function* WatchAddBasketSaga(action: any) {
    const token = localStorage.getItem('token');
    console.log(action.payload);
    try {

        const res: Promise<basketState> = yield call(() =>  fetch(DOMEN.basket.addBasket, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({productId: action.payload.id, quantity: action.payload.quantity}),
    }));
        yield put(getBasketFetch());
    } catch(error) {

    }
}
function* BasketSaga() {
    yield takeEvery('cardSlice/editBasketFetch', WatchEditCountBasketSaga);

    yield takeEvery('cardSlice/getBasketFetch', WatchBasketSaga);
    yield takeEvery('cardSlice/deleteBasket', WatchDeleteBasketSaga);
    yield takeEvery('cardSlice/addBasketFetch', WatchAddBasketSaga);


}
export default BasketSaga;
