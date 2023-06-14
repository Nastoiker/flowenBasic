import { call, put, takeEvery } from "redux-saga/effects";
import { loginFailed, loginSuccess } from "../slices/auth.slice";
import { ProductState } from "../product.slice";
import { DOMEN } from "../../../domen.api";
import { userState } from "../slices/user.slice";

function* login(action: any) {
  try {
    const { email, password } = action.payload;
    const response: Response = yield call(() =>
      fetch(DOMEN.user.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
    );
    if (!response.ok) {
      throw new Error(response.url);
    }
    const token: userState = yield response.json();
    yield put(loginSuccess(token));
  } catch (error) {
    if(error instanceof Error){
      if (error.message === "401") {
        yield put(loginFailed("Неподходящие данные"));
      } else {
        yield put(loginFailed("Ошибка"));
      }
    }

  }
}
function* authSaga() {
  yield takeEvery("auth/loginFetch", login);
}
export default authSaga;
