import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  createProjectApi,
  fetchProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from "../../Apis/ProjectApi";

const singleProjectSlice = createSlice({
  name: "singleProject",
  initialState: {
    project: {
      name: "",
      wiki: "",
      member: [],
      year1_visibility: true,
      year2_visibility: true,
      year3_visibility: true,
      year4_visibility: true,
      year5_visibility: true,
    },
    loading: "idle",
    error: "Project could not be retreived",
  },
  reducers: {
    // Add your list-related actions here
    // addList: (state, action) => {
    //   state.projects.push(action.payload);
    // },
    // deleteList: (state, action) => {
    //   state.projects = state.projects.filter(
    //     (project) => project.id !== action.payload
    //   );
    // },
    updateProjectState: (state, action) => {
      const { updatedProject } = action.payload;
      state.project = updatedProject;
    },
  },
  //   },

  extraReducers: (builder) => {
    builder.addCase(fetchProject.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.project = action.payload;
    });
    builder.addCase(fetchProject.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message;
    });
    //  builder.addCase(deleteProject.fulfilled, (state, action) => {
    //    state.lists = state.lists.filter((task) => task.id !== action.payload);
    //  });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.project = action.payload; // Assuming your API returns the updated project
    });
  },
});

export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async (projectId) => {
    try {
      const response = await fetchProjectApi(projectId);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem fetching project", error);
    }
  }
);

// export const createProject = createAsyncThunk(
//   "project/Projects",
//   async (newProject) => {
//     try {
//       const response = await createProjectApi(newProject);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       toast.error("Problem creating projects");
//     }
//   }
// );

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (object) => {
    console.log(object);
    try {
      const {projectId,newProject}=object;
      console.log(projectId, "idd");
      console.log(newProject, "ko");
      const response = await updateProjectApi(projectId, newProject);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem updating projects", error);
    }
  }
);

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

export const selectProject = (state) => state.singleProject.project;
export const { updateProjectState } = singleProjectSlice.actions;
export default singleProjectSlice.reducer;
