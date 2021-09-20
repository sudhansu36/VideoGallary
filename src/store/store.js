import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import contentSlice from "./contentSlice";
import watchlistSlice from "./watchlistSlice";
import favouriteSlice from "./favouriteSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    contentCollection: contentSlice,
    watchlist: watchlistSlice,
    favourite: favouriteSlice,
  },
});
