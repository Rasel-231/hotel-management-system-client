import { tagtypes } from "@/store/redux/types";
import { baseApi } from "../baseApi/baseApi";

import { IRoomsResponse } from "@/store/Types/types";

const ROOMS_URL = "/rooms";

export const roomApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getRoomsByHotelId: build.query<IRoomsResponse, string>({
            query: (hotelId) => ({
                url: `${ROOMS_URL}/${hotelId}`,
                method: "GET",
            }),
            providesTags: [tagtypes.room],

        }),
    }),
    overrideExisting: false,
});

export const { useGetRoomsByHotelIdQuery } =
    roomApi;