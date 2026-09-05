import { baseApi } from "../api/baseApi/baseApi";

export const rootReducer = {
    [baseApi.reducerPath]: baseApi.reducer,
}