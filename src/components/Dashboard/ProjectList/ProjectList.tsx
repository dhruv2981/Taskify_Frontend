import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import Button from "@mui/material/Button";
import { AddRounded } from "@mui/icons-material";
import { List , ListItem,ListItemText,Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import './../../../assets/css/projectList.css';
import {Link} from 'react-router-dom';



function ListProjectComponent(props:any) {
  const [projectList, setProjectList] = useState([]);
  const {fromChild}=props;
  const openCreateProjectModal=()=>{
    fromChild(true)
  }
 

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
  const listItem={
    
    // padding:'1rem 0rem 0rem 1rem',
    // textAlign:'center',
  }
  const listItemText={
    // font:'5rem',
    // padding:'1rem 0rem 0rem 1rem',
    // textAlign:'center',
  }
  const addButton={

    // justifySelf:'flexEnd',
    // alignSelf:'center',

  }

  const fetchData = async () => {
    const url = "http://127.0.0.1:8000/taskify/projects/";
    await axios.get(url, {
      headers: {
        Authorization: "Token " + localStorage.getItem("auth_token"),
      },
    })
    .then(response=>{
        setProjectList(response.data)})
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className='heading'>Projects</h2>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <div className='projectList'>
        {projectList.map((project, index) => (
          <Link to={`/project/${project['id']}`} style={{ textDecoration: "none",color:'black' }}>
          <div key={index} className='listItem'>
            <p className='listItemText'>{project["name"]}</p>
          </div>
          </Link>
        ))}
      </div>
      <div className='addButton' onClick={()=>{openCreateProjectModal()}}>
      <Button variant="contained" endIcon={<AddRounded />}>
        Add Project
      </Button>
      </div>
    </div>
  );
}
export default ListProjectComponent;

