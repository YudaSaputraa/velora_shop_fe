import { configureStore } from "@reduxjs/toolkit";
import { ApiProduct } from "./req/ApiProduct";
import { ApiCategory } from "./req/ApiCategory";
import AuthSlice from "./slice/AuthSlice";
import { ApiAuth } from "./req/ApiAuth";
import { ApiUser } from "./req/ApiUser";
import { ApiAddress } from "./req/ApiAddress";
import { ApiOrder } from "./req/ApiOrder";
import { ApiCart } from "./req/ApiCart";

const data_store = configureStore({
  reducer: {
    auth: AuthSlice,
    [ApiAuth.reducerPath]: ApiAuth.reducer,
    [ApiUser.reducerPath]: ApiUser.reducer,
    [ApiAddress.reducerPath]: ApiAddress.reducer,
    [ApiProduct.reducerPath]: ApiProduct.reducer,
    [ApiCategory.reducerPath]: ApiCategory.reducer,
    [ApiOrder.reducerPath]: ApiOrder.reducer,
    [ApiCart.reducerPath]: ApiCart.reducer,
  },
  middleware: (geDefaultMiddleware) =>
    geDefaultMiddleware().concat([
      ApiAuth.middleware,
      ApiUser.middleware,
      ApiAddress.middleware,
      ApiProduct.middleware,
      ApiCategory.middleware,
      ApiOrder.middleware,
      ApiCart.middleware,
    ]),
});

export default data_store;
