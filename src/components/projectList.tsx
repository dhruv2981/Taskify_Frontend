import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import "./../assets/css/dashboard.css";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import Button from "@mui/material/Button";
import { AddRounded } from "@mui/icons-material";
import { List , ListItem,ListItemText,Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



function ListProjectComponent() {
  const [projectList, setProjectList] = useState([]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
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
      <Typography variant="h5">Projects</Typography>
      <List>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        {projectList.map((project, index) => (
          <ListItem key={index}>
            <ListItemText primary={project["name"]}></ListItemText>
          </ListItem>
        ))}
        <Button variant="contained" endIcon={<AddRounded />}>
          Add Project
        </Button>
      </List>
    </div>
  );
}
export default ListProjectComponent;
