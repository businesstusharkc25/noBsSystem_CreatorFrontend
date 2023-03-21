import { configureStore } from "@reduxjs/toolkit";
import addChannelApi from "./app/add-channel/services/addChannel.services";
import contentApi from "./app/content/services/content.services";
import { contentSlice } from "./app/content/services/contentSlice";
import membershipApi from "./app/memberships/services/membership.services";
import { userSlice } from "./components/User";
import { userWalletApi } from "./sharedServices";

export const store = configureStore({
  reducer: {
    appUser: userSlice.reducer,
    dappContent: contentSlice.reducer,
    [userWalletApi.reducerPath]: userWalletApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [membershipApi.reducerPath]: membershipApi.reducer,
    [addChannelApi.reducerPath]: addChannelApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userWalletApi.middleware,
      contentApi.middleware,
      membershipApi.middleware,
      addChannelApi.middleware
    ),
});
