import React, { useState } from "react";
import "./template.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Common/Header/header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaMicrosoft,
  FaCalendar,
  FaRegSun,
  FaQuestion,
  FaRightFromBracket,
  FaArrowRight,
  FaArrowLeft,
  FaBars,
  FaX,
  FaTrashCan,
  ImInsertTemplate,
} from "react-icons/fa6";
import { GoRepoTemplate } from "react-icons/go";
import Sidebar from "../../Common/Sidebar/sidebar";
import UserProfilePage from "../UserData/UserDataPage";

const Templates = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const getusers = () => {
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
            setData(response.data.templateids);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id, user) => {
    if (window.confirm(`Are Sure you want to delete ${user}`)) {
      try {
        const response = await fetch("/api/v1/admin/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: id }), // Replace with your request body
        });
        console.log(response);
        getusers();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const navigateToTemplate = (templateid) => {
    navigate(`/${templateid}/resumeData/`);
  };
  useEffect(() => {
    getusers();
  }, []);

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

  const [compose, setCompose] = useState(false);
  const tabCompose = () => {
    setCompose((prev) => !prev);
  };
  const [mobcompose, setMobCompose] = useState(false);
  const mobileCompose = () => {
    setMobCompose((prev) => !prev);
  };
  return (
    <>
      <motion.div
        variants={divVar}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="sites-main"
      >
        <Sidebar compose={compose} tabCompose={tabCompose} />
        <div className={compose ? "sites-composed-center" : "sites-center"}>
          <h1>
            Template
            <FaBars onClick={mobileCompose} />
          </h1>

          <div className="table-container">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Template ID</th>
                    <th>Template Name</th>
                    <th>Template Job</th>
                    <th>Get Details</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((i) => {
                    return (
                      <tr>
                        <td style={{ width: "25%" }}>{i.templateid}</td>
                        <td style={{ width: "25%" }}>{`${i.templatename}`}</td>
                        <td style={{ width: "25%" }}>{i.wantedjobtitle}</td>
                        <td className="notes" style={{ width: "25%" }}>
                          <button
                            onClick={() => {
                              navigateToTemplate(i.templateid);
                            }}
                          >
                            Get Info
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {mobcompose ? (
          <motion.div
            variants={mobVar}
            initial="hidden"
            animate="visible"
            className="mob-leftside"
          >
            <FaX onClick={mobileCompose} />
            <div className="leftside-con">
              <Link to="/dashboard">
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
              <Link to="/login">
                <FaRightFromBracket />
                <h2>Logout</h2>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </>
  );
};
export default Templates;
