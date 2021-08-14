import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    signin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signin } = userSlice.actions;

export default userSlice.reducer;
