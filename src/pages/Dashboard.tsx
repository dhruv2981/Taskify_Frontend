import React,{useState,useEffect} from "react";
// import './../assets/css/dashboard.css'
import ListProjectComponent from "../components/projectList";


function Dashboard(){
    // const [projectList,setProjectList]=useState([]);

    // const fetchData=async()=>{
    //     const url = "http://127.0.0.1:8000/taskify/projects/";
    //     const response = await axios.get(url,
    //       {headers:{
    //         Authorization:"Token "+localStorage.getItem("auth_token")
    //       }});
    //     setProjectList(response.data);
    // }

    // useEffect(()=>{
    //     fetchData();

    // },[]);


    return (
        <div>
          <ListProjectComponent/>
        </div>
      
    );

}
export default Dashboard;