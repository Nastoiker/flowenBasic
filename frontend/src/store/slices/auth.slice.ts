import {createSlice} from "@reduxjs/toolkit";
interface State {
    token: string | null;
    login: 'fetch' | 'failed' | 'success';
}
const initialState:State = {
    token: localStorage.getItem('token'),
    login: 'fetch',
};
const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginFetch: (state, action) => {
            state.login = 'fetch';
        },
        loginFailed: (state, action) => {
            state.login = 'failed';
        },
        loginSuccess: (state, action) => {
            state.token = action.payload.jwt;
            localStorage.setItem('token', action.payload.jwt);
            state.login = 'success';
            console.log(localStorage.getItem('token'));
        },
        logoutSuccess: (state) => {
            state.token = null;

            localStorage.removeItem('token');
        }
    }
});
export const {loginSuccess, logoutSuccess, loginFetch, loginFailed} = AuthSlice.actions;
export default AuthSlice.reducer;