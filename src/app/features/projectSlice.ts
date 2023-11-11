import { AnyAction, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';



const projectSlice=createSlice({
    name:'projects',
    initialState:{
        projects:[],
        loading:'idle',
        error:'Projects could not be retreived',
    },
    reducers:{},
    extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.error.message!;
    });
  },



})


export const fetchProjects=createAsyncThunk('user/fetchProjects',async()=>{
    const token=localStorage.getItem("auth_token");
    if(!token){
        console.log("Token not found in local storage");
    }
    try{
    const url = "http://127.0.0.1:8000/taskify/projects/";
    const response=await axios.get(url, {
      headers: {
        Authorization: "Token " +token,
      },
    })
    console.log(response.data)
    return response.data;
}catch(error){
    console.log("Problem fetching projects");
}})

//action 

//reducer

//     .then(response=>{
//         setProjectList(response.data)})
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
export const selectProjects = (state:any) => state.projects.projects;
export default projectSlice.reducer;
