import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favoriteReducer from './favSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fav: favoriteReducer,
  },
});
