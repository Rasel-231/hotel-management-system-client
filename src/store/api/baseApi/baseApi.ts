import { axiosBaseQuery } from "@/store/redux/axiosBaseQuery";
import { tagtypeList } from "@/store/redux/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:3000" }),
    endpoints: () => ({}),
    tagTypes: tagtypeList,
});