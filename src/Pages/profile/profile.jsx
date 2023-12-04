import React, { useEffect, useState } from "react";
import "./profile.css";
import Header from "../../Common/Header/header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaBattleNet } from "react-icons/fa6";
const Profile = () => {
  const [data, setData] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [downloads, setDownload] = useState(0);
  const [ai, setAi] = useState(0);
  const token = localStorage.getItem("authToken");

  const { userId } = useParams();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const newValue = e.target.value;
    setDownload(newValue);
    console.log("New value being set:", newValue); // Log the current value
  };
  const navigateToTemplate = (templateid) => {
    navigate(`/${templateid}/resumeData/`);
  };
  const updateUser = () => {
    axios({
      method: "put",
      url: `/api/v1/admin/update/${data.userid}`,
      data: {
        downloads_remaining: ai,
        ai_usage_remaining: downloads,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteUser = async (id, user) => {
    if (window.confirm(`Are Sure you want to delete ${user}`)) {
      try {
        const response = await fetch("/api/v1/admin/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ userid: id }), // Replace with your request body
        });
        console.log(response);
        navigate("/sites");
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const getuser = async () => {
      try {
        await axios
          .get(`/api/v1/admin/fetchuser/${userId}`, {
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setData(response.data.userData);
            setTemplates(response.data.userData.templates);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
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
  const styles = {
    facebookBtn: {
      backgroundColor: "rgb(51, 89, 157)",
    },
    form: {
      textAlign: "center",
    },
  };
  return (
    <>
      <motion.div variants={divVar} initial="hidden" animate="visible">
        <div className="main">
          <div className="profile-btn">
            <Link to="/dashboard">
              <button>Back</button>
            </Link>
          </div>

          <div className="container">
            <div className="user">
              <h1>{data.name}</h1>
              <div className="user-card">
                <button
                  className="user-status"
                  onClick={() => {
                    deleteUser(data.userid, data.name);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="user-details">
              About
              <div className="user-details-container">
                <div className="user-details-box">
                  <div className="user-details-child">Name</div>
                  <div className="user-details-child">Plan</div>
                  <div className="user-details-child">Stripe Customer Id</div>
                  <div className="user-details-child">Downloads Remaining</div>
                </div>
                <div className="user-details-box">
                  <div className="user-details-child">{data.name}</div>
                  <div className="user-details-child">{data.plan}</div>
                  <div className="user-details-child">
                    {data.stripecustomerid}
                  </div>
                  <div className="user-details-child">
                    {data.downloads_remaining}
                  </div>
                </div>
                <div className="user-details-box">
                  <div className="user-details-child">Email</div>
                  <div className="user-details-child">Verified</div>
                  <div className="user-details-child">Subscription Id</div>
                  <div className="user-details-child">Ai Usage Remaining</div>
                </div>
                <div className="user-details-box">
                  <div className="user-details-child">{data.email}</div>
                  <div className="user-details-child">{`${data.verified}`}</div>
                  <div className="user-details-child">{`${data.subscriptionid}`}</div>
                  <div className="user-details-child">{`${data.ai_usage_remaining}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mapping-button-container">
          {templates.map((item, index) => {
            return (
              <button
                key={index}
                className="mapping-btns"
                onClick={() => {
                  navigateToTemplate(item);
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div>
          <div className="form">
            <div className="form-group">
              <label for="nameImput">Downloads</label>
              <input
                type="number"
                name="download"
                value={downloads}
                onChange={(e) => {
                  setDownload(e.target.value);
                  console.log(downloads);
                }}
                className="form-control"
                id="nameImput"
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <label for="emailImput">Ai</label>
              <input
                name="email"
                type="number"
                value={ai}
                className="form-control"
                id="emailImput"
                onChange={(e) => {
                  setAi(e.target.value);
                  console.log(ai);
                }}
                placeholder="email@domain.com"
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary"
              onClick={updateUser}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
