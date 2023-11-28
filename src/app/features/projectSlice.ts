import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import "../../Apis/ProjectApi";
import "../../Apis/ProjectApi";
import {
  createProjectApi,
  fetchProjectApi,
  fetchProjectsApi,
  updateProjectApi,
  deleteProjectApi,
} from "../../Apis/ProjectApi";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: "idle",
    error: "Projects could not be retreived",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message!;
    });
  },
});

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    try {
      const response = await fetchProjectsApi();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem fetching projects");
    }
  }
);

export const fetchProject = createAsyncThunk(
  "project/fetchProjects",
  async (projectId) => {
    try {
      const response = await fetchProjectApi(projectId);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem fetching project");
    }
  }
);

export const createProject = createAsyncThunk(
  "project/Projects",
  async (newProject) => {
    try {
      const response = await createProjectApi(newProject);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem creating projects");
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProjects",
  async (projectId, newProject) => {
    try {
      const response = await updateProjectApi(projectId, newProject);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem updating projects");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId, newProject) => {
    try {
      await deleteProjectApi(projectId);
      return projectId;
    } catch (error) {
      console.log("Problem deleting projects");
    }
  }
);

//action

//reducer

//     .then(response=>{
//         setProjectList(response.data)})
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
export const selectProjects = (state: any) => state.projects.projects;
export default projectSlice.reducer;