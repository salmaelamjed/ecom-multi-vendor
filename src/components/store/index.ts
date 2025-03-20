import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth/authSlice"; // Import the auth slice
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import users from "./users/usersSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"], // Persist user and token
};

const rootReducer = combineReducers({
  categories,
  products,
  users,
  cart: persistReducer(cartPersistConfig, cart),
  auth: persistReducer(authPersistConfig, auth), // Add auth to the root reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
