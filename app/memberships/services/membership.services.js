import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addMembershipRoute,
  deleteMembershipRoute,
  getMembershipRoute,
  getMembershipsRoute,
  updateMembershipRoute,
} from "../../../constants/appApiRoutes";

const membershipApi = createApi({
  reducerPath: "membershipApi",
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

  tagTypes: ["membershipApi"],

  endpoints: (builder) => ({
    addMembership: builder.mutation({
      query: ({ formBody }) => ({
        url: addMembershipRoute,
        method: "POST",
        body: formBody,
      }),
    }),

    getMemberships: builder.query({
      query: ({ page = 1 }) => ({
        url: getMembershipsRoute,
        params: { page },
      }),
      providesTags: ["membershipApi"],
    }),

    getMembershipById: builder.query({
      query: (id) => (id ? `${getMembershipRoute}/${id}` : null),
      providesTags: ["membershipApi"],
    }),

    deleteMembership: builder.mutation({
      query: ({ id }) => ({
        method: "DELETE",
        url: `${deleteMembershipRoute}/${id}`,
      }),
      invalidatesTags: ["membershipApi"],
    }),

    updateMembership: builder.mutation({
      query: ({ id, formBody }) => ({
        url: `${updateMembershipRoute}/${id}`,
        method: "PUT",
        body: formBody,
      }),
    }),
  }),
});

export const {
  useAddMembershipMutation,
  useGetMembershipsQuery,
  useDeleteMembershipMutation,
  useGetMembershipByIdQuery,
  useUpdateMembershipMutation,
} = membershipApi;
export default membershipApi;
