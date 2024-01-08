import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import Button from "@mui/material/Button";
import { AddRounded } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import "./../../../assets/css/projectList.css";
import { Link, useParams } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteProjectApi } from "../../../Apis/ProjectApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  selectProjects,
} from "../../../app/features/projectSlice";
import { updateProjectsState } from "../../../app/features/projectSlice";
import { CiEdit } from "react-icons/ci";
import {
  selectAddEdit,
  updateAddEditState,
} from "../../../app/features/addEditStateSlice";

function ListProjectComponent(props) {
  // const [projectList, setProjectList] = useState([]);
  const { fromChildProject, currentUser } = props;
  const { id } = useParams();
  console.log(id, "projectList");
  const dispatch = useDispatch();
  const projectList = useSelector(selectProjects);
  console.log(projectList, "select");
  const loading = useSelector((state) => state.projects.loading);
  const addEditState = useSelector(selectAddEdit);
  const openCreateProjectModal = () => {
    fromChildProject(true);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    border: "0.2rem solid black",
    // borderRadius:'0.2rem',
    marginLeft: 0,

    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
      paading: "1rem 0rem 0rem 1rem",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const listItem = {
    // padding:'1rem 0rem 0rem 1rem',
    // textAlign:'center',
  };
  const listItemText = {
    // font:'5rem',
    // padding:'1rem 0rem 0rem 1rem',
    // textAlign:'center',
  };
  const addButton = {
    // justifySelf:'flexEnd',
    // alignSelf:'center',
  };
  const handleEditProject = (project) => {
    // fromChildProject(true);

    if (!project.member.includes(currentUser.id) && currentUser.role === "n") {
      toast.error("Only project member can do it");
      return;
    }

    const newAddEditState = {
      ...addEditState,
      editProject: true,
      editProjectId: project.id,
      // editListId: list.id,
    };

    dispatch(updateAddEditState({ newAddEditState }));
    console.log("stage 1");
  };

  const handleDeleteProject = async (project) => {
    if (!project.member.includes(currentUser.id) && currentUser.role === "n") {
      toast.error("Only project member can do it");
      return;
    }
    try {
      const response = await deleteProjectApi(project.id);

      // if( id && project.id==id){
      //   console.log("a");
      //   window.location.href = "http://127.0.0.1:3000/dashboard";
      // }

      console.log(response, "delete");
      const updatedProjects = projectList.filter(
        (currentProject) => project.id !== currentProject.id
      );
      console.log(updatedProjects, "kooo");
      dispatch(updateProjectsState({ updatedProjects }));
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Project deletion unsuccessful");
    }
  };

  const checkStatus = () => {
    if (loading == "idle" || loading == "pending") {
      return true;
    } else {
      return false;
    }
  };

  const fetchData = async () => {
    await dispatch(fetchProjects());
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <div>
      {!checkStatus() && (
        <>
          <h2 className="heading">Projects</h2>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <div className="projectList">
            {projectList.map((project, index) => (
              <div key={index} className="listItem">
                <Link
                  to={`/project/${project["id"]}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p className="listItemText">{project["name"]}</p>
                </Link>
                <CiEdit
                  style={{ width: "20", height: "20" }}
                  onClick={() => {
                    handleEditProject(project);
                  }}
                />
                <MdOutlineDeleteOutline
                  style={{ width: "20", height: "20" }}
                  onClick={() => {
                    handleDeleteProject(project);
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className="addButton"
            onClick={() => {
              openCreateProjectModal();
            }}
          >
            <Button variant="contained" endIcon={<AddRounded />}>
              Add Project
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
export default ListProjectComponent;
