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
  FaPlus,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoRepoTemplate } from "react-icons/go";
const Sidebar = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    console.log("Logging Out");
    localStorage.clear();
    navigate("/login");
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
          <FaPlus /> <h2> Add User</h2>
        </Link>
      </div>

      <div className="leftside-secondcon">
        <button
          onClick={() => {
            logout();
          }}
        >
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
