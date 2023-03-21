import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addContentRoute,
  deleteContentByIdRoute,
  getContentByIdRoute,
  getContentRoute,
  updateContentRoute,
} from "../../../constants/appApiRoutes";

const contentApi = createApi({
  reducerPath: "contentApi",
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

  tagTypes: ["contentApi"],

  endpoints: (builder) => ({
    addContent: builder.mutation({
      query: ({ contentData }) => ({
        url: addContentRoute,
        method: "POST",
        body: contentData,
      }),
      invalidatesTags: ["contentApi"],
    }),

    updateContent: builder.mutation({
      query: ({ contentData, id }) => ({
        url: `${updateContentRoute}/${id}`,
        method: "PUT",
        body: contentData,
      }),
      invalidatesTags: ["contentApi"],
    }),

    getContent: builder.query({
      query: ({ filter = {} }) => ({
        url: getContentRoute,
        params: Object.keys(filter).length > 0 && filter,
      }),

      providesTags: ["contentApi"],
    }),

    getContentById: builder.query({
      query: ({ id }) => id && `${getContentByIdRoute}/${id}`,
    }),

    deleteContentById: builder.mutation({
      query: ({ id }) => ({
        url: id && `${deleteContentByIdRoute}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contentApi"],
    }),
  }),
});

export const {
  useAddContentMutation,
  useGetContentQuery,
  useGetContentByIdQuery,
  useUpdateContentMutation,
  useDeleteContentByIdMutation,
} = contentApi;
export default contentApi;
