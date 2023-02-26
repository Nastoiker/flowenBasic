import {createSlice} from "@reduxjs/toolkit";
export interface RegState {
    token: string | null;
    login: 'fetch' | 'failed' | 'success';
}
const initialState:RegState = {
    token: localStorage.getItem('token'),
    login: 'fetch',
};
const RegSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerFetch: (state, action) => {
            state.login = 'fetch';
            console.log(action);
        },
        registerFailed: (state, action) => {
            state.login = 'failed';
        },
        registerSuccess: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            state.login = 'success';
        },

    }
});
export const {registerFailed, registerSuccess, registerFetch } = RegSlice.actions;
export default RegSlice.reducer;