import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from "../../Apis/ProjectApi";

// const projectSlice = createSlice({
//   name: "project",
//   initialState: {
//     project: ,
//     loading: "idle",
//     error: "Project could not be retreived",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchProject.pending, (state) => {
//       state.loading = "pending";
//     });
//     builder.addCase(fetchProject.fulfilled, (state, action) => {
//       state.loading = "fulfilled";
//       state.project = action.payload;
//     });
//     builder.addCase(fetchProject.rejected, (state, action) => {
//       state.loading = "rejected";
//       state.error = action.error.message!;
//     });
//   },
// });

// export const fetchProjects = createAsyncThunk(
//   "project/fetchProjects",
//   async () => {
//     try {
//       const response = await fetchProjectsApi();
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.log("Problem fetching projects");
//     }
//   }
// );


