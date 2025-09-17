import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiProduct = createApi({
  reducerPath: "/apiProduct",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/product`,
    credentials: "include",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, page, limit, categoryId }) => ({
        url: "/get-products",
        method: "GET",
        params: { search, page, limit, categoryId },
      }),
      providesTags: ["products"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/add-product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    deleteProductImg: builder.mutation({
      query: (id) => ({
        url: `/delete-image/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useDeleteProductImgMutation,
} = ApiProduct;
