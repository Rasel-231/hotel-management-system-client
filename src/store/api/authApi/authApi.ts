import { tagtypes } from "@/store/redux/types";
import { baseApi } from "../baseApi/baseApi";

import { LoginData, LoginResponse, RegistrationData } from "@/store/Types/types";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation<LoginResponse, LoginData>({
            query: (loginData) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                data: loginData,
            }),
            invalidatesTags: [tagtypes.user],
        }),

        userRegister: build.mutation<LoginResponse, RegistrationData>({
            query: (registrationData) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                data: registrationData,
            }),
            invalidatesTags: [tagtypes.user],
        }),

        userLogout: build.mutation<void, void>({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: "POST",
            }),
            invalidatesTags: [tagtypes.user],
        }),
    }),
    overrideExisting: false,
});

export const { useUserLoginMutation, useUserRegisterMutation, useUserLogoutMutation } =
    authApi;