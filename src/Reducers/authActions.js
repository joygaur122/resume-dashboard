import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      const response = await axios.get("/api/v1/admin/token-validation", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      if (response.status !== 200) {
        throw new Error("Unauthorized");
      }

      return response.data;
    } catch (error) {
      // if (error.response && error.response.status === 401) {
      //   localStorage.removeItem("authToken");
      //   // Optionally redirect the user to the login page
      // }
      throw error;
    }
  }
);

export default fetchUser;
