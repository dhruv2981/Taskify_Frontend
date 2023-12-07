import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { fetchListApi } from "../../../Apis/ListApi";

const Card = (props) => {
    const {card}=props;
     const projectCard={
    display:"flex",
    flexDirection:"column",
    border:"0.2rem solid black",
    // backgroundColor:'',
    borderRadius:'0.4rem',
    padding:'0.2rem 0rem 0.2rem 0.4rem',
    width:"20%",
    marginBottom:'2rem',
  }
   const heading = {
     // textDecoration:'none',
   };
   const description = {
     // textDecoration: 'none',
     // color:'white',
   };
   const [projectId,setProjectId] =useState('');
   const fetchData=async()=>{
    const response=await fetchListApi(card.list);
    setProjectId(response.data.project)

   }

   useEffect(() => {
      fetchData();
   }, [])
   

  return (
    <div style={projectCard}>
      <Link
        to={`/project/${projectId}/card/${card.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div style={heading}>
          <h2>{card.title}</h2>
        </div>
        {/* <div style={description}>
          <h4>{project.wiki}</h4>
        </div> */}
      </Link>
    </div>
  );
}
export default Card;