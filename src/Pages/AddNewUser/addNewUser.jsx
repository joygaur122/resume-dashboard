import React, { useEffect, useState } from "react";
import "../Login/login.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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

const AddNewUser = () => {
  const [registermail, setRegisterMail] = useState("");
  const [registerpassword, setRegisterPassword] = useState("");
  const [name, setName] = useState("");
  const token = localStorage.getItem("authToken");

  const showToast = (error) => {
    toast.error(`${error}`, {
      data: {
        title: "Error",
        text: error,
      },
    });
  };
  const showToasRes = (res) => {
    toast(`${res}`, {
      data: {
        title: "Error",
        text: res,
      },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a request body object
    const requestBody = {
      email: registermail,
      password: registerpassword,
      name: name,
    };
    await axios
      .post("/api/v1/admin/register", requestBody, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        showToasRes(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        showToast(error);
      });
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
      <ToastContainer />

      <Sidebar />
      <motion.div
        variants={divVar}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="Adduser"
      >
        <motion.form initial="hidden" animate="visible" action="">
          <div className="register">
            <div className="register-main">
              <h1>API</h1>
              <p>xxxxxx</p>
              <h2>Please Fill-in Details To Register Yourself</h2>
              <label>Your Name</label>
              <input
                type="text"
                placeholder="rohit etc"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => setRegisterMail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button onClick={handleSubmit}>Register</button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </>
  );
};
export default AddNewUser;
