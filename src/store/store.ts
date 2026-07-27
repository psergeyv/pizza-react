import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";
import favoriteSlice, { FAVORITE_PERSISTENT_STATE } from "./favorite.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    favorite: favoriteSlice,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
  saveState(store.getState().cart, CART_PERSISTENT_STATE);
  saveState(store.getState().favorite, FAVORITE_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
