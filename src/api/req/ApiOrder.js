import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiOrder = createApi({
  reducerPath: "/apiOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/order`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: `/create-order`,
        method: "POST",
        body,
      }),
    }),
    getOrders: builder.query({
      query: ({ search, page, limit }) => ({
        url: "/get-orders",
        method: "GET",
        params: { search, page, limit },
      }),
      providesTags: ["orders"],
    }),
    createResi: builder.mutation({
      query: (body) => ({
        url: `/give-resi`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["orders"],
    }),
    confirmOrder: builder.mutation({
      query: (orderId) => ({
        url: `/confirm/${orderId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/cancel-order/${orderId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    getProfit: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/profit`,
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["orders"],
    }),
    getOrderSummary: builder.query({
      query: () => ({
        url: `/order-summary`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useCreateResiMutation,
  useCancelOrderMutation,
  useConfirmOrderMutation,
  useGetProfitQuery,
  useGetOrderSummaryQuery,
} = ApiOrder;
