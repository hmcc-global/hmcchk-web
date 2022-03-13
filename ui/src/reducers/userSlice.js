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
    signout: (state, action) => {
      state.user = {};
    },
  },
});

export const { signin, signout } = userSlice.actions;

export default userSlice.reducer;
