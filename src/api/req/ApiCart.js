import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiCart = createApi({
  reducerPath: "/cart",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/cart`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCart: builder.mutation({
      query: (body) => ({
        url: `/create-cart`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["carts"],
    }),
    getCarts: builder.query({
      query: () => ({
        url: "/get-carts",
        method: "GET",
      }),
      providesTags: ["carts"],
    }),
    updateCartItem: builder.mutation({
      query: ({ cartId, productId, quantity, price }) => ({
        url: `/update-cart-item`,
        method: "PUT",
        body: { cartId, productId, quantity, price },
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useCreateCartMutation,
  useGetCartsQuery,
  useUpdateCartItemMutation,
} = ApiCart;
