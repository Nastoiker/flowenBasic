import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const AdminApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/admin',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({

        banUser: builder.mutation({
            query: (id) => ({
                url: '/deleteUser',
                method: 'DELETE',
                body: {...id },
            }),
        }),
        removeAdmin: builder.mutation({
            query: (admin) => ({
                url: '/commentVideo',
                method: 'POST',
                body: {...admin },
            }),
        }),
        unBanUser: builder.mutation({
            query: (user) => ({
                url: '/commentVideo',
                method: 'POST',
                body: {...user },
            }),
        }),
        removeAdminAbility: builder.mutation({
            query: (commentVideo) => ({
                url: '/commentVideo',
                method: 'POST',
                body: {...commentVideo },
            }),
        }),
        createCategory: builder.mutation({
            query: (firstCategory) => ({
                url: '/createFirstCategory',
                method: 'POST',
                body: {...firstCategory },
            }),
        }),
        users: builder.query({
            query: () => ({
                url: '/users',
                method: 'get',
            }),
        }),
    }),
});
export const { useUsersQuery, useBanUserMutation } = AdminApi;
