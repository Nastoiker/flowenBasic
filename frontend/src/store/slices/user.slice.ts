import {createSlice} from "@reduxjs/toolkit";

export interface userState {
    id: string;
    email: string,
    login: string,
    password: string,
    phone?: string,
    avatar?: string,
    address?: Address,
    comment? :CommentUser,
}
interface CommentUser {
    id: string;
    createdAt: Date;
    title: string;
    pictures: string;
    comment: string;
    writtenById: string;
    modelDeviceId: string;
}
interface State {
    user: userState;
    isLoading: boolean,
    token: string | null,
}
export interface Address {
    city: string,
    country: string,
    streeet: string,
    created_at: string,
    updated_at: string,
}

export const initialState: State = {
        user: {   email: '',
            login: '',
            password: '',
        },
        isLoading: false,
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state) => {
          state.token = localStorage.getItem('token');
        },
        getUserFetch: (state) => {
            state.isLoading = false;
        },
        getUserFailed: (state, action) => {
            state.isLoading = false;
        },
        getUserSuccess: (state, action) => {
            state.isLoading = true;
            state.user = action.payload;
        },
    }
});
export const { getUserFetch, getUserFailed, getUserSuccess} = userSlice.actions;
export default userSlice.reducer;