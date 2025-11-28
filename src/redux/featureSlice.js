import { createSlice } from "@reduxjs/toolkit";

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    selected: "announcements",
  },
  reducers: {
    setFeature: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setFeature } = featureSlice.actions;
export default featureSlice.reducer;
