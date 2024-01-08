import React, { useState, useEffect } from "react";
// import './../assets/css/dashboard.css'
import ListProjectComponent from "../components/Dashboard/ProjectList/ProjectList";
import Navbar from "../components/Dashboard/Navbar/Navbar";
import UserProjects from "../components/Dashboard/MainArea/userProjects";
import ProjectModal from "../components/Modals/projectModal";
import { CurrentUser } from "../CurrentUser/CurrentUser";
import { fetchProjects } from "../app/features/projectSlice";
import { useDispatch,useSelector } from "react-redux";
import UserCards from "./../components/Dashboard/MainArea/userCard";
import { selectAddEdit } from "../app/features/addEditStateSlice";

function Dashboard() {
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const handleChildData = (childData) => {
    setOpenProjectModal(childData);
  };

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
    flexDirection: "column",
  };

  const projectList = {
    border: "0.2rem solid black",
    width: "max-content",
    padding: "1rem 3rem 1rem 2rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: "1",
  };
  const centerContainer = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    flexGrow: "1",
    padding: "2rem 0rem 0rem 2rem",
  };
  const dispatch = useDispatch();
  const projectSlider = {};
  const cardSlider = {};
  const currentUser = useSelector((state) => state.singleUser);
  const addEditState = useSelector(selectAddEdit);
  useEffect(() => {
    dispatch(fetchProjects);
  }, []);

  return (
    <div>
      <CurrentUser></CurrentUser>
      {!(openProjectModal || addEditState.editProject) && (
        <div style={fullPage}>
          <div style={navbarStyle}>
            <Navbar />
          </div>
          <div style={mainContent}>
            <div style={projectList}>
              <ListProjectComponent
                fromChildProject={handleChildData}
                currentUser={currentUser}
              />
            </div>
            <div style={centerContainer}>
              <div style={projectSlider}>
                <UserProjects />
              </div>
              <div style={cardSlider}>
                <UserCards />
              </div>
            </div>
          </div>
        </div>
      )}
      {(openProjectModal || addEditState.editProject) && (
        <ProjectModal fromChildProject={handleChildData} />
      )}
    </div>
  );
}
export default Dashboard;
