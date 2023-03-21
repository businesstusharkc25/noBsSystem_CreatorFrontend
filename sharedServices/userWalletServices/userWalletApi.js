import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  changeCurrentChannelRoute,
  connectWalletRoute,
  getAllUserChannels,
} from "../../constants/appApiRoutes";

const userWalletApi = createApi({
  reducerPath: "userWalletApi",
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

  tagTypes: ["userWalletApi"],
  endpoints: (builder) => ({
    connectUserWallet: builder.mutation({
      query: (userWalletAddress) => ({
        url: connectWalletRoute,
        method: "POST",
        body: userWalletAddress,
      }),
      invalidatesTags: ["userWalletApi"],
    }),

    getChannelsData: builder.query({
      query: () => getAllUserChannels,
      providesTags: ["userWalletApi"],
    }),

    changeCurrentChannel: builder.mutation({
      query: (channelId) => ({
        url: changeCurrentChannelRoute,
        method: "POST",
        body: channelId,
      }),
      invalidatesTags: ["userWalletApi"],
    }),
  }),
});

export const {
  useConnectUserWalletMutation,
  useLazyGetChannelsDataQuery,
  useChangeCurrentChannelMutation,
} = userWalletApi;
export default userWalletApi;
