import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/User";
import Header from "../../Common/Header/header";
import { motion } from "framer-motion";
import "./login.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchUser from "../../Reducers/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a request body object
    const requestBody = {
      email: email,
      password: password,
    };
    await axios
      .post("/api/v1/admin/login", requestBody, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        dispatch(fetchUser());
        if (response.status === 200) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        showToast(error);
      });
  };
  const [registermail, setRegisterMail] = useState("");
  const [registerpassword, setRegisterPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
    // Create a request body object
    const requestBody = {
      email: registermail,
      password: registerpassword,
      name: name,
      role: "user",
    };
    try {
      axios
        .post("/api/v1/admin/register", requestBody, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          showToast(error);
        });
    } catch (error) {
      console.log(error);
    }
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

  const registerAnim = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        mass: 0.4,
        damping: 12,
      },
    },
  };
  const [register, setRegister] = useState(false);
  const showRegiter = () => {
    setRegister((prev) => !prev);
  };

  return (
    <div>
      <ToastContainer />
      <motion.div variants={divVar} initial="hidden" animate="visible">
        <form action="">
          <div className="login">
            <div className="login-main">
              <h1>API</h1>
              <p>xxxxxx</p>
              <h2>Please log in using your Login Credentials</h2>
              <label>Username</label>
              <input
                type="text"
                placeholder="doctor_1"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSubmit}>Log In</button>
              <h3 onClick={showRegiter}>Want to Regiter ?</h3>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
export default Login;
