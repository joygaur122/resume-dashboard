import React from "react";
import "./sidebar.css";
import {
  FaMicrosoft,
  FaCalendar,
  FaRegSun,
  FaQuestion,
  FaRightFromBracket,
  FaArrowRight,
  FaArrowLeft,
  FaUsers,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoRepoTemplate } from "react-icons/go";
const Sidebar = (props) => {
  const logout = () => {
    axios
      .get("http://localhost:4000/api/v1/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={props.compose ? "composed" : "dashboard-leftside"}>
      <div className="leftside-firstcon">
        <Link to="/">
          <FaMicrosoft />
          <h2> Dashboard</h2>
        </Link>
        <Link to="/sites">
          <FaUsers />
          <h2> Users</h2>
        </Link>
        <Link to="/templates">
          <GoRepoTemplate />
          <h2> Templates</h2>
        </Link>
        <Link to="/add-user">
          +<h2> Add User</h2>
        </Link>
      </div>

      <div className="leftside-secondcon">
        <Link>
          <FaRegSun />
          <h2>Settings</h2>
        </Link>
        <Link>
          <FaQuestion />
          <h2>Help Center</h2>
        </Link>
        <button
          onClick={() => {
            logout();
          }}>
          <FaRightFromBracket />
          <h2>Logout</h2>
        </button>
        <button onClick={props.tabCompose}>
          {props.compose ? <FaArrowRight /> : <FaArrowLeft />}
          <h2>Compose</h2>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
