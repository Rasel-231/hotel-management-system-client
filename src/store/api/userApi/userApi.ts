import { tagtypes } from "@/store/redux/types";
import { baseApi } from "../baseApi/baseApi";

import { IUserApiResponse, IUserResponse, LoginData, LoginResponse } from "@/store/Types/types";

const USERS_URL = "/users";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userRegister: build.mutation<LoginResponse, LoginData>({
            query: (registrationData) => ({
                url: `${USERS_URL}/register`,
                method: "POST",
                data: registrationData,
            }),
            invalidatesTags: [tagtypes.user],
        }),
        getUsers: build.query<IUserResponse, void>({
            query: () => ({
                url: `${USERS_URL}`,
                method: "GET",
            }),
            providesTags: [tagtypes.user],

        }),
        userProfile: build.query<IUserApiResponse, void>({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: "GET",
            }),
            providesTags: [tagtypes.user],

        }),

    }),
    overrideExisting: false,
});

export const { useUserRegisterMutation, useGetUsersQuery, useUserProfileQuery } =
    userApi;