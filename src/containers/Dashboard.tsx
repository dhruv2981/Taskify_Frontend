import React,{useState,useEffect} from "react";
import './../assets/css/dashboard.css'
import axios from "axios";


function ListProjectComponent(){
    const [projectList,setProjectList]=useState([]);

    const fetchData=async()=>{
        const url = "http://127.0.0.1:8000/taskify/projects/";
        const response = await axios.get(url, 
            { withCredentials: true });
        console.log(response);
        setProjectList(response.data);
        console.log(projectList)
    }

    useEffect(()=>{
        fetchData();

    },);


    return (
        <div>
          <h3>Projects</h3>
          <div className="projects">
            {projectList.map((project) => (
              <ul>
                <li>
                  <a href="http://127.0.0.1:8000/taskify/projects/{{project['id']}}/">
                    {project["name"]}
                  </a>
                </li>
              </ul>
            ))}
          </div>
        </div>
      
    );

}
export default ListProjectComponent;