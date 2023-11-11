import React, { useState } from "react";
import { useParams ,Link} from "react-router-dom";
import axios from "axios";


const projectCard = (props: any) => {

   
  const { project } = props;
  return (
    <div className="projectCard">
    {/* <Link to={'project/${project.id}'}> */}
        <div className="heading">
          <p>{project.name}</p>
        </div>
        <div className="description">
          <p>{project.wiki}</p>
        </div>
    {/* </Link> */}
    </div>
  );
};
export default projectCard;
