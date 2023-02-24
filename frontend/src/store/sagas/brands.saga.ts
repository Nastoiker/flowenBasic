import {call, put, takeEvery} from "redux-saga/effects";
import {loginSuccess} from "../slices/auth.slice";
import {ProductState} from "../product.slice";
import {brandsState, getBrandsSuccess} from "../slices/brand.slice";
import {DOMEN} from "../../../domen.api";

export function* workerBrandsSaga() {
        console.log(11111);
        const data:Promise<brandsState> = yield call(() => fetch( DOMEN.brand.getBrands));
        const token: brandsState[] = yield data.json();
        console.log(token);
        yield put(getBrandsSuccess(token));
}
function* BrandSaga() {
    yield takeEvery('brands/getBrandsFetch', workerBrandsSaga);
}
export default BrandSaga        ;
