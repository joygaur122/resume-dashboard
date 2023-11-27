import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function ProtectedRoute({ children }) {
  const loadUserStatus = useSelector((state) => state.loadUser.status);
  console.log(loadUserStatus);
  if (loadUserStatus !== "succeeded") {
    console.log(
      "Redirecting to /auth/login because status is:",
      loadUserStatus
    );
    if (loadUserStatus === "loading") {
      return <div>Loading...</div>;
    }
    return <Navigate to="/login" replace />;
  } else {
    console.log("Rendering children because status is:", loadUserStatus);
    return children;
  }
}

export default ProtectedRoute;
