import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";
import fetchUser from "./authActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: localStorage.getItem("loadUserStatus") || "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        localStorage.setItem("loadUserStatus", "loading");
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log("Fulfilled action:", action);
        state.status = "succeeded";
        state.data = action.payload;
        localStorage.setItem("loadUserStatus", "succeeded");
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        localStorage.setItem("loadUserStatus", "failed");
      });
  },
});

export default userSlice.reducer;
