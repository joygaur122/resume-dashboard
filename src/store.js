import { configureStore } from "@reduxjs/toolkit";
import loadUserSlice from "./Reducers/loadUserSlice";

const initialState = {};
const store = configureStore({
  reducer: {
    loadUser: loadUserSlice,
  },
});

export default store;
