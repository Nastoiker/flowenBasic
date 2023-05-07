import {createSlice} from "@reduxjs/toolkit";

export interface userState {
    id: string;
    email: string,
    login: string,
    password: string,
    phone?: string,
    avatar?: string,
    address?: Address,
    comment?: CommentUser[],
    basket?: Basket[],
    isActive: boolean;
}
export interface CommentUser {
    id: string;
    createdAt: Date;
    title: string;
    pictures: string;
    comment: string;
    writtenById: string;
    modelDeviceId: string;
}
interface Basket {
    id: string;
    buying: boolean;
    productId: string;
    userId: string;
    boughtProductId?: any;
    quantity: number;
    createdAt: Date;
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
        user: {
            email: '',
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
        editAddress: (state, action) => {
            state.user.address = action.payload;
        },
        createAddress: (state, action) => {
            state.user.address = action.payload;
        },
        editProfile: (state, action) => {
        }
    }
});
export const { getUserFetch, getUserFailed, getUserSuccess, editAddress, createAddress, editProfile} = userSlice.actions;
export default userSlice.reducer;