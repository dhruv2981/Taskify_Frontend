import React, { useState, useEffect } from "react";
// import './../assets/css/dashboard.css'
import ListProjectComponent from "../components/Dashboard/ProjectList/ProjectList";
import Navbar from "../components/Dashboard/Navbar/Navbar";
import UserProjects from "../components/Dashboard/MainArea/userProjects";
import ProjectModal from "../components/Modals/projectModal"

function Dashboard() {
  const [openProjectModal,setOpenProjectModal]=useState(false);
  const handleChildData=(childData:boolean)=>{
    setOpenProjectModal(childData);
  }

  const mainContent = {
    display: "flex",
    width: "auto",
    flexGrow: "1",
    // paddingTop:'2rem',
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
    padding: "1rem 3rem 1rem 2rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column" as "column",
    flexGrow: "1",
  };
  const centerContainer = {
    display: "flex",
    width: "100%",
    flexDirection: "column" as "column",
    flexGrow: "1",
    padding: "2rem 0rem 0rem 2rem",
  };
  const projectSlider = {};

  return (
    <div>
      {!openProjectModal &&
      <div style={fullPage}>
        <div style={navbarStyle}>
          <Navbar />
        </div>
        <div style={mainContent}>
          <div style={projectList}>
            <ListProjectComponent fromChild={handleChildData}/>
          </div>
          <div style={centerContainer}>
            <div style={projectSlider}>
              <UserProjects />
            </div>
          </div>
        </div>
      </div>}
      {openProjectModal && <ProjectModal/>}
    </div>
  );
}
export default Dashboard;
