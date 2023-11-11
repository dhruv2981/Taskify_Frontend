import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const Project = () => {

    const [projectObject,setProjectObject]=useState('');
    const {id}=useParams();

    const fetchData = async () => {
      const url = "http://127.0.0.1:8000/taskify/projects/${id}";
      await axios
        .get(url, {
          headers: {
            Authorization: "Token " + localStorage.getItem("auth_token"),
          },
        })
        .then((response) => {
          setProjectObject(response.data);
        });
    };

  return (

    <div>
        
    </div>
  )
}
export default Project;