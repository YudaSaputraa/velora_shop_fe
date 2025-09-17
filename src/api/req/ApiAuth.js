import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiAuth = createApi({
  reducerPath: "/apiAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/authentication`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: "/signin",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    loadUser: builder.mutation({
      query: () => ({
        url: "/load-user",
        method: "GET",
      }),
      invalidatesTags: ["loadUser"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useLoadUserMutation,
  useLogoutMutation,
} = ApiAuth;
