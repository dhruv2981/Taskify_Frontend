import React, { useState } from "react";
import { useParams ,Link} from "react-router-dom";
import axios from "axios";



const projectCard = (props: any) => {

  

  const projectCard={
    display:"flex",
    flexDirection:"column" as "column",
    border:"0.2rem solid black",
    // backgroundColor:'',
    borderRadius:'0.4rem',
    padding:'0.2rem 0rem 0.2rem 0.4rem',
    width:"20%",
    marginBottom:'2rem',
    // textDecoration:'none',
    

  }
  const heading={
    // textDecoration:'none',
  }
  const description = {
    // textDecoration: 'none',
    // color:'white',
  };

   
  const { project } = props;
  return (
    <div style={projectCard}>
      <Link to={`/project/${project.id}`} style={{ textDecoration: "none",color:"black" }}>
        <div style={heading}>
          <h2>{project.name}</h2>
        </div>
        <div style={description}>
          <h4>{project.wiki}</h4>
        </div>
      </Link>
    </div>
  );
};
export default projectCard;
