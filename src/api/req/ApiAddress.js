import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiAddress = createApi({
  reducerPath: "/ApiAddress",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/address`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProvinces: builder.query({
      query: () => ({
        url: "/get-provinces",
        method: "GET",
      }),
    }),
    getCity: builder.query({
      query: (provinceId) => ({
        url: `/get-city/${provinceId}`,
        method: "GET",
      }),
    }),
    getDistrict: builder.query({
      query: (cityId) => ({
        url: `/get-district/${cityId}`,
        method: "GET",
      }),
    }),
    getVillage: builder.query({
      query: (districtId) => ({
        url: `/get-village/${districtId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useGetCityQuery,
  useGetDistrictQuery,
  useGetVillageQuery,
} = ApiAddress;
