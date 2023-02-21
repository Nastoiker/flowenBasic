import {createSlice} from "@reduxjs/toolkit";
interface State {
    token: string | null;
}
const initialState:State = {
    token: localStorage.getItem('token'),
};
const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logoutSucces: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        }
    }
});
export const {loginSuccess, logoutSucces} = AuthSlice.actions;