import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiUser = createApi({
  reducerPath: "/apiUser",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/authentication`,
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/update-profile",
        method: "PUT",
        body,
      }),
    }),
    getAllUsers: builder.query({
      query: ({ search, page, limit }) => ({
        url: "/get-users",
        method: "GET",
        params: { search, page, limit },
      }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = ApiUser;
