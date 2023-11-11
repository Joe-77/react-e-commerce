import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { apiStore } from "../feature/api/apiSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cartSlice from "../cart/cartSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  [apiStore.reducerPath]: apiStore.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whiteList: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiStore.middleware
    ),
});

export let persistStor = persistStore(store);

/*
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { apiStore } from "../feature/api/apiSlice";

const rootReducer = combineReducers({
  auth: ap,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whiteList: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export let persistStor = persistStore(store);


*/
