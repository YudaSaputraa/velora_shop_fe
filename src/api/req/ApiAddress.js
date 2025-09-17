import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiAddress = createApi({
  reducerPath: "/apiAddress",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/address`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCities: builder.mutation({
      query: (city) => ({
        url: `/get-cities/${city}`,
        method: "GET",
      }),
    }),
    addAddress: builder.mutation({
      query: (body) => ({
        url: "/add-address",
        method: "POST",
        body,
      }),
    }),
    getShippingCost: builder.mutation({
      query: ({ courier, weight, destination }) => ({
        url: "/cost",
        method: "GET",
        params: { courier, weight, destination },
      }),
    }),
  }),
});

export const {
  useGetCitiesMutation,
  useAddAddressMutation,
  useGetShippingCostMutation,
} = ApiAddress;
