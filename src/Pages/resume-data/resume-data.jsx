import React, { useEffect, useState } from "react";
import Header from "../../Common/Header/header";
import "./resume-data.css";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const ResumeData = () => {
  const { templateid } = useParams();
  const [data, setData] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [customsection, setCustomsection] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("he;");
    const getuser = async () => {
      try {
        await axios
          .get(`/api/v1/admin/fetchtemplate/${templateid}`, {
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setData(response.data.templateData);
            setEmployment(response.data.templateData.employmenthistory);
            setEducation(response.data.templateData.education);
            setSkills(response.data.templateData.skills);
            setWebsites(response.data.templateData.social);
            setCustomsection(response.data.templateData.untitledsection);
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
  return (
    <div>
      <Header />
      <motion.div
        variants={divVar}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="data-main">
        <div className="data-btn">
          <Link to="/dashboard">
            <button>Return To Dashboard</button>
          </Link>
        </div>
        <div className="data-container">
          <h1>RESUME DATA</h1>
          <div className="data-section">
            <div className="data-section-child">
              <div className="data-heading">Wanted Job Title</div>
              <div className="data-text">{`${data.wantedjobtitle}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Security Clearance</div>
              <div className="data-text">{`${data.securityclearance}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">First Name</div>
              <div className="data-text">{`${data.firstname}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Last Name</div>
              <div className="data-text">{`${data.lastname}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Email</div>
              <div className="data-text">{`${data.email}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Phone Number</div>
              <div className="data-text">{`${data.phone}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">City</div>
              <div className="data-text">{`${data.city}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Country</div>
              <div className="data-text">{`${data.country}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Address</div>
              <div className="data-text">{`${data.address}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Postal Code</div>
              <div className="data-text">{`${data.postalcode}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Driving License</div>
              <div className="data-text">{`${data.drivinglicense}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Nationality</div>
              <div className="data-text">{`${data.nationality}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Place of Birth</div>
              <div className="data-text">{`${data.placeofbirth}`}</div>
            </div>
            <div className="data-section-child">
              <div className="data-heading">Date of Birth</div>
              <div className="data-text">{`${data.dateofbirth}`}</div>
            </div>
          </div>
          <div className="personal-info-section">
            <h2>PROFESSIONAL SUMMARY </h2>
            <p className="personal-info-text">{`${data.professionalsummary}`}</p>
          </div>

          <h2>EMPLOYMENT HISTORY</h2>
          {employment.map((item, index) => {
            return (
              <div key={index} className="employment-section">
                <div className="data-section">
                  <div className="data-section">
                    <div className="data-section-child">
                      <div className="data-heading">Job Title</div>
                      <div className="data-text">{item.jobtitle1}</div>
                    </div>
                    <div className="data-section-child">
                      <div className="data-heading">Employer</div>
                      <div className="data-text">{item.employer}</div>
                    </div>
                    <div className="data-section-child">
                      <div className="data-date-heading">Date</div>
                      <div className="data-date">
                        <div className="data-startdate">{item.jobstart}</div>
                        <div className="data-enddate">{item.jobend}</div>
                      </div>
                    </div>
                    <div className="data-section-child">
                      <div className="data-heading">City</div>
                      <div className="data-text">{item.jobcity}</div>
                    </div>
                    <div className="data-description">
                      <h3>Description</h3>
                      <p>{item.jobdescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <h2>EDUCATION</h2>
          {education.map((item, index) => {
            return (
              <div key={index} className="education-section">
                <div className="data-section">
                  <div className="data-section">
                    <div className="data-section-child">
                      <div className="data-heading">School</div>
                      <div className="data-text">{item.school}</div>
                    </div>
                    <div className="data-section-child">
                      <div className="data-heading">Degree</div>
                      <div className="data-text">{item.degree}</div>
                    </div>
                    <div className="data-section-child">
                      <div className="data-date-heading">Date</div>
                      <div className="data-date">
                        <div className="data-startdate">{item.start}</div>
                        <div className="data-enddate">{item.end}</div>
                      </div>
                    </div>
                    <div className="data-section-child">
                      <div className="data-heading">City</div>
                      <div className="data-text">{item.city1}</div>
                    </div>
                    <div className="data-description">
                      <h3>Description</h3>
                      <p>{item.edudescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <h2>WEBSITES AND SOCIAL LINKS</h2>
          {websites.map((item, index) => {
            return (
              <div key={index} className="data-section">
                <div className="data-section-child">
                  <div className="data-heading">Label</div>
                  <div className="data-text">{item.label}</div>
                </div>
                <div className="data-section-child">
                  <div className="data-heading">Link</div>
                  <div className="data-text">{item.link}</div>
                </div>
              </div>
            );
          })}
          <h2>SKILLS</h2>
          <div className="data-skills-section">
            {skills.map((item, index) => {
              return (
                <div key={index} className="data-skills">
                  {item}
                </div>
              );
            })}
          </div>
          <h2>CUSTOM SECTION</h2>
          {customsection.map((item, index) => {
            return (
              <div key={index} className="custom-section">
                <div className="data-section">
                  <div className="data-section">
                    <div className="data-section-child">
                      <div className="data-heading">Section Title</div>
                      <div className="data-text">{item.sectionTitle}</div>
                    </div>
                    <div className="data-section-child">
                      <div className="data-heading">Activity</div>
                      <div className="data-text">{item.activity}</div>
                    </div>
                    <div className="data-section-child">
                      <div className="data-date-heading">Date</div>
                      <div className="data-date">
                        <div className="data-startdate">
                          {item.customStartDate}
                        </div>
                        <div className="data-enddate">{item.customEndDate}</div>
                      </div>
                    </div>
                    <div className="data-section-child">
                      <div className="data-heading">City</div>
                      <div className="data-text">{item.customSectionCity}</div>
                    </div>
                    <div className="data-description">
                      <h3>Description</h3>
                      <p>{item.customDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeData;
