import { configureStore } from "@reduxjs/toolkit";
import featureReducer from "./featureSlice";

export const store = configureStore({
  reducer: {
    feature: featureReducer,
  },
});
