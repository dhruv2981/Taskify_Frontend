import React, { useState, useEffect } from "react";
// import './../assets/css/dashboard.css'
import ListProjectComponent from "../components/Dashboard/ProjectList";
import Navbar from "../components/Dashboard/Navbar";
import UserProjects from "../components/Dashboard/userProjects";

function Dashboard() {
  const mainContent = {
    display: "flex",
    width: "100%",
    flexGrow: "1",
  };

  const navbarStyle = {
    display: "flex",
    width: "100%",
  };
  const fullPage = {
    display: "flex",
    height: "100vh",
    flexDirection: "column" as "column",
  };

  const projectList = {
    border: "0.2rem solid black",
    width: "max-content",
    padding: "1rem",
    display: "flex",
    flexDirection: "column" as "column",
    flexGrow: "1",
  };
  const centerContainer = {
    display: "flex",
    width: "100%",
    flexDirection: "column" as "column",
  };
  const projectSlider = {};

  return (
    <div style={fullPage}>
      <div style={navbarStyle}>
        <Navbar />
      </div>
      <div style={mainContent}>
        <div style={projectList}>
          <ListProjectComponent />
        </div>
        <div style={centerContainer}>
          <div style={projectSlider}>
            <UserProjects />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
