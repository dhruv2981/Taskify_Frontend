import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ListProjectComponent from "../components/Dashboard/ProjectList/ProjectList";
import Navbar from "../components/Dashboard/Navbar/Navbar";
import ListModal from "../components/Modals/listModal";
import CardModal from "../components/Modals/cardModal";
import {
  fetchProject,
  selectProject,
} from "../app/features/singleProjectSlice";
import { CurrentUser } from "../CurrentUser/CurrentUser";
import ListContainer from "../components/Project/ListContainer";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { AddRounded } from "@mui/icons-material";
import AddMemberModal from "../components/Modals/addMemberModal";
import { selectAddEdit } from "./../app/features/addEditStateSlice";
import "./..";
import ProjectModal from "../components/Modals/projectModal";
import toast from "react-hot-toast";

const Project = () => {
  const mainContent = {
    display: "flex",
    width: "auto",
    flexGrow: "1",
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
  const listContainer = {
    margin: "2rem 0rem 0rem 0rem",
  };
  const topContainer = {
    display: "flex",
    flexDirection: "row",
    gap: "5rem",
  };

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.singleProject.loading);

  console.log(loading, "u");
  const { id } = useParams();

  const fetchData = async () => {
    await dispatch(fetchProject(id));
  };

  // dispatch(fetchProject(id));

  const currentProject = useSelector(selectProject);
  // const lists = useSelector(selectLists);
  console.log(currentProject, "v");
  // const currentProject={};

  const [openListModal, setOpenListModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [listPassCard, setListPassCard] = useState("");
  const addEditState = useSelector(selectAddEdit);
  const currentUser = useSelector((state) => state.singleUser);
  // if (addEditState.editList===true) {
  //   setOpenListModal(true);
  // }

  const handleListPass = (listPassCard) => {
    setListPassCard(listPassCard);
  };
  const handleChildData = (childData) => {
    setOpenListModal(childData);
  };
  const handleChildCardData = (childData) => {
    setOpenCardModal(childData);
  };
  const handleChildMemberData = (childData) => {
    setOpenMemberModal(childData);
  };
  const handleChild = (childData) => {
    setOpenProjectModal(childData);
  };
  const openCreateListModal = () => {
    if (
      !currentProject.member.includes(currentUser.id) &&
      currentUser.role === "n"
    ) {
      toast.error("Only project member can do it");
      return;
    }
    setOpenListModal(true);
  };
  const openAddMemberModal = () => {
    if (
      !currentProject.member.includes(currentUser.id) &&
      currentUser.role === "n"
    ) {
      toast.error("Only project member can do it");
      return;
    }
    setOpenMemberModal(true);
  };

  const openCreateCardModal = () => {
    setOpenCardModal(true);
  };

  const checkStatus = () => {
    if (loading == "idle" || loading == "pending") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, id]);

  return (
    <div>
      <CurrentUser></CurrentUser>

      {!checkStatus() && !openProjectModal && (
        <div style={fullPage}>
          <div style={navbarStyle}>
            <Navbar />
          </div>
          <div style={mainContent}>
            <div style={projectList}>
              <ListProjectComponent fromChildProject={handleChild} />
              {/* fromChild={handleChildData} */}
            </div>
            <div style={centerContainer}>
              <div style={topContainer}>
                <h1
                  style={{
                    fontSize: "2.6rem",
                    marginBlockStart: "0.1em",
                    marginBlockEnd: "0.1em",
                  }}
                >
                  {currentProject.name}
                </h1>
                <div
                  className="addButton"
                  onClick={() => {
                    openCreateListModal();
                  }}
                  style={{ display: "inline" }}
                >
                  <Button
                    variant="contained"
                    endIcon={<AddRounded />}
                    style={{ fontSize: "1.2rem" }}
                  >
                    Add List
                  </Button>
                </div>
                <div
                  className="addMemberButton"
                  onClick={() => {
                    openAddMemberModal();
                  }}
                  style={{ display: "inline", alignSelf: "center" }}
                >
                  <Button
                    variant="contained"
                    endIcon={<AddRounded />}
                    style={{ fontSize: "1.2rem" }}
                  >
                    Add Member
                  </Button>
                </div>
              </div>
              {
                <div style={listContainer}>
                  <ListContainer
                    currentProject={currentProject}
                    fromChildCard={handleChildCardData}
                    listToCard={handleListPass}
                  />
                </div>
              }
            </div>
            {(openListModal || addEditState.editList) && (
              <ListModal fromChild={handleChildData} project={currentProject} />
            )}
            {openMemberModal && (
              <AddMemberModal
                fromChildMember={handleChildMemberData}
                project={currentProject}
              />
            )}
            {(openCardModal || addEditState.editCard) && (
              <CardModal
                fromChildCard={handleChildCardData}
                project={currentProject}
                list={listPassCard}
              />
            )}
          </div>
        </div>
      )}
      {openProjectModal && (
        <ProjectModal fromChildProject={setOpenProjectModal} />
      )}
    </div>
  );
};
export default Project;
