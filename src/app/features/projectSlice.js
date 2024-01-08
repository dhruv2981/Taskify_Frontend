import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
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
  reducers: {
    updateProjectsState: (state, action) => {
      const { updatedProjects } = action.payload;
      state.projects = updatedProjects;
      console.log(updatedProjects,"project slcie")

    },
  },

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
      state.error = action.error.message;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.projects.push(action.payload);
    });

    //  builder.addCase(deleteProject.fulfilled, (state, action) => {
    //    state.lists = state.lists.filter((task) => task.id !== action.payload);
    //  });
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


export const createProject = createAsyncThunk(
  "project/Projects",
  async (newProject) => {
    try {
      const response = await createProjectApi(newProject);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Problem creating projects");
    }
  }
);

// export const updateProject = createAsyncThunk(
//   "project/updateProjects",
//   async (object) => {
//     try {
//       const { projectId, newProject } = object;
//       const response = await updateProjectApi(projectId, newProject);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.log("Problem updating projects");
//     }
//   }
// );

// export const deleteProject = createAsyncThunk(
//   "project/deleteProject",
//   async (projectId) => {
//     try {
//       await deleteProjectApi(projectId);
//       return projectId;
//     } catch (error) {
//       console.log("Problem deleting projects");
//     }
//   }
// );

//action

export const selectProjects = (state) => state.projects.projects;
export const { addList, deleteList, updateProjectsState } = projectSlice.actions;
export default projectSlice.reducer;
