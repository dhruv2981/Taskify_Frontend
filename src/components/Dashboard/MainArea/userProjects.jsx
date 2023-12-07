import ProjectCard from "./ProjectCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  selectProjects,
} from "../../../app/features/projectSlice.js";


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
  // console.log(projects,'f');
  const currentUser = useSelector((state) => state.singleUser);

  useEffect(() => {
    // dispatch(fetchProjects());
    console.log("hi");
  }, []);
  return (
    <div>
      <h2 style={heading}>My Projects</h2>
      <div style={userProjects}>
        {/* <div style={projectCard}> */}
        {console.log(projects, "A")}
        {projects.map((project) => (
          // Conditionally render ProjectCard based on whether currentUser.id is in the members array
          // Adjust the condition as per your project structure
          (project.member.includes(currentUser.id)) ? (
            <ProjectCard key={project.id} project={project} />
          ) : null
        ))}
        {console.log("b")}
        {/* </div> */}
      </div>
    </div>
  );
};
export default UserProjects;
