import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addChannelRoute } from "../../../constants/appApiRoutes";

const addChannelApi = createApi({
  reducerPath: "addChannelApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().appUser.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    baseUrl: process.env.NEXT_PUBLIC_NO_BS_BASE_API_ROUTE,
  }),

  tagTypes: ["addChannelApi"],

  endpoints: (builder) => ({
    addChannel: builder.mutation({
      query: ({ channelFormData }) => ({
        url: addChannelRoute,
        method: "POST",
        body: channelFormData,
      }),
      invalidatesTags: ["addChannelApi"],
    }),
  }),
});

export const { useAddChannelMutation } = addChannelApi;

export default addChannelApi;
