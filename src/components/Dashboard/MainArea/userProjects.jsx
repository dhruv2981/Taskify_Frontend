import ProjectCard from "./ProjectCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  selectProjects,
} from "../../../app/features/projectSlice";
import { store } from "../../../app/store";

const UserProjects = () => {
  const heading = {
    fontSize: "2.4rem",
    marginBottom: "3rem",
    marginBlockStart: "0rem",
  };
  const userProjects = {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    gap: "3%",
  };
  const projectCard = {};
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(fetchProjects());
    console.log("hi");
  }, []);
  return (
    <div>
      <h2 style={heading}>My Projects</h2>
      <div style={userProjects}>
        {/* <div style={projectCard}> */}
        {console.log(projects, "A")}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {console.log("b")}
        {/* </div> */}
      </div>
    </div>
  );
};
export default UserProjects;
