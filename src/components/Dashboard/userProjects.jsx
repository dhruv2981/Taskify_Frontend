import projectCard from "./ProjectCard";
import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import fetchProjects,{selectProjects} from "../../app/features/projectSlice";
import {store} from './../../app/store';

const UserProjects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(fetchProjects());
    console.log("hi");
  }, []);
  return (
    <div>
      {console.log(projects)}
      {projects.map((project) => (
        <projectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
export default UserProjects;