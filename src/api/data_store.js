import { configureStore } from "@reduxjs/toolkit";
import { ApiProduct } from "./req/ApiProduct";
import { ApiCategory } from "./req/ApiCategory";

const data_store = configureStore({
  reducer: {
    [ApiProduct.reducerPath]: ApiProduct.reducer,
    [ApiCategory.reducerPath]: ApiCategory.reducer,
  },
  middleware: (geDefaultMiddleware) =>
    geDefaultMiddleware().concat([
      ApiProduct.middleware,
      ApiCategory.middleware,
    ]),
});

export default data_store;
