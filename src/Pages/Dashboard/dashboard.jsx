import React, { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";
import {
  FaMicrosoft,
  FaCalendar,
  FaRegSun,
  FaQuestion,
  FaRightFromBracket,
  FaUserGroup,
  FaBars,
  FaX,
} from "react-icons/fa6";
import Header from "../../Common/Header/header";
import { Link } from "react-router-dom";
import Sidebar from "../../Common/Sidebar/sidebar";
import { motion } from "framer-motion";
import { GoRepoTemplate } from "react-icons/go";
const Dashboard = () => {
  const [user, setUser] = useState();
  const [templateData, setTemplateData] = useState();

  const logout = () => {
    const token = localStorage.getItem("authToken");

    axios
      .get("/api/v1/logout", {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token,
        },
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
  const getusers = () => {
    const token = localStorage.getItem("authToken");

    try {
      (async () => {
        axios
          .get("/api/v1/admin/fetchusers", {
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setUser(response.data.totalUsers);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    } catch (error) {
      console.log(error);
    }
  };
  const getTemaplate = () => {
    const token = localStorage.getItem("authToken");

    try {
      (async () => {
        axios
          .get("/api/v1/admin/fetchtemplates", {
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setTemplateData(response.data.totaltemplates);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getusers();
    getTemaplate();
  }, []);
  const [compose, setCompose] = useState(false);
  const tabCompose = () => {
    setCompose((prev) => !prev);
  };
  const [mobcompose, setMobCompose] = useState(false);
  const mobileCompose = () => {
    setMobCompose((prev) => !prev);
  };

  const divVar = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        mass: 0.1,
        damping: 15,
        duration: 0.5,
      },
    },
    exit: {
      x: "-100vw",
      opacity: 0,
      duration: 0.5,
    },
  };

  const mobVar = {
    hidden: {
      x: "100vh",
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <Header />
      <motion.div
        variants={divVar}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="dashboard-main">
        <Sidebar tabCompose={tabCompose} compose={compose} />
        <div className={compose ? "composed-center" : "dashboard-center"}>
          <h1>
            Daily Overview
            <FaBars onClick={mobileCompose} />
          </h1>
          <div className="center-box-cont">
            <div className="center-box">
              <FaUserGroup />
              <h2>
                {user}
                <br />
                <span>User Added</span>
              </h2>
            </div>
            <div className="center-box">
              <FaUserGroup />
              <h2>
                {templateData}
                <br />
                <span>Templates Created</span>
              </h2>
            </div>
          </div>
        </div>

        {mobcompose ? (
          <motion.div
            variants={mobVar}
            initial="hidden"
            animate="visible"
            className="mob-leftside">
            <FaX onClick={mobileCompose} />
            <div className="leftside-con">
              <Link to="/">
                <FaMicrosoft />
                <h2> Dashboard</h2>
              </Link>
              <Link to="/sites">
                <FaCalendar />
                <h2> Sites</h2>
              </Link>
              <Link to="/templates">
                <GoRepoTemplate />
                <h2> Templates</h2>
              </Link>
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
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </>
  );
};
export default Dashboard;
