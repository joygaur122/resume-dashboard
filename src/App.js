import "./App.css";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./Pages/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import Sites from "./Pages/Sites/sites";
import { loadUser } from "./Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import UserProfilePage from "./Pages/UserData/UserDataPage";
import Profile from "./Pages/profile/profile";

import ResumeData from "./Pages/resume-data/resume-data";
import Templates from "./Pages/Templates/templates";
import ProtectedRoute from "./Protected/index";
import AddNewUser from "./Pages/AddNewUser/addNewUser";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  useEffect(() => {
    dispatch(loadUser());
    console.log("changed");
  }, []);

  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          {/* <Route key="privateroute" element={<PrivateRoute />}> */}
          <Route
            key="dashboard"
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
            exact
          />
          <Route
            key="dashboard"
            path="/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            key="sites"
            path="/sites"
            element={
              <ProtectedRoute>
                <Sites />
              </ProtectedRoute>
            }
          />
          <Route
            key="sites"
            path="/templates"
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            }
          />

          <Route
            key="userProfile"
            path="/:userId/userProfile/"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            key="addNew"
            path="/add-user"
            element={
              <ProtectedRoute>
                <AddNewUser />
              </ProtectedRoute>
            }
          />
          <Route
            key="resumeData"
            path="/:templateid/resumeData/"
            element={
              <ProtectedRoute>
                <ResumeData />
              </ProtectedRoute>
            }
          />
          {/* </Route> */}
          <Route key="login" path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
